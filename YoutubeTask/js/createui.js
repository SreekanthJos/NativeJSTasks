var myApp = myApp || {};

myApp.ui = (function (document) {
    var pageCount = 0,
    startIndex = 0,
    endIndex = 0,
   
    options = {
        totalItems: [],
        pageSize: 4,
        currentPageIndex: 0
    },
    tabResolution = {
        MIN_WIDTH: 450,
        MAX_WIDTH: 750
    },
    mobResolution ={
        MAX_WIDTH: 450,
        MIN_WIDTH: 0
    },
    width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    

    function initiatePaging(){
        width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        if (width < tabResolution.MAX_WIDTH && width > tabResolution.MIN_WIDTH) {
            options.pageSize = 2;
        } else if (width < tabResolution.MAX_WIDTH) {
            options.pageSize = 1;
        } else {
            options.pageSize = 4;
        }
        displayTiles();
    }

function displayTiles(){
    var container = document.getElementById("container"),
    tiles = container.querySelector('.tiles'),
    prePageIndex = startIndex;
    startIndex = (options.currentPageIndex * options.pageSize);
    if (startIndex > options.totalItems.length) {
        startIndex = 0;
        options.currentPageIndex = 0;
    }
    endIndex = startIndex + options.pageSize;
    tiles.querySelectorAll("li").forEach(function (ele, index) {
        if (index >= startIndex && index < endIndex) {
            ele.classList.remove("hide");
        } else {
            ele.classList.add("hide");
        }
    });
    createPager();
}

    function createTile(item) {

        var tileTemp = document.querySelector('#tileTemplate'),
        tile = tileTemp.content.querySelector('.tile'),
        content = tileTemp.content.querySelector('.content'),
        img = content.querySelector('.videoImg'),
        title = content.querySelector('.title'),
        publishedDate = content.querySelector('.publishedDate'),
        viewsCount = content.querySelector('.viewsCount'),
        description = content.querySelector('.description');
        img.setAttribute('src', item.imgUrl);
        title.textContent = item.title;
        publishedDate.textContent = getDateString(item.publishedDate);
        viewsCount.textContent = item.viewsCount;
        description.textContent = item.description;
        
        return document.importNode(tileTemp.content, true);;
    }
    function getDateString(date){
        var dateObj = new Date(date);
        return dateObj.getFullYear() + '-' + (dateObj.getUTCMonth()+1) + '-' + dateObj.getUTCDate();
    }

    function createContainersForVideo() {
       var body = document.body,
            template = document.querySelector("#template"),
            container = template.content.querySelector("#container"),
            tiles = container.querySelector('.tiles'),
            list = options.totalItems,
            divElement = document.getElementById("container");
            while (tiles.hasChildNodes()) {
                tiles.removeChild(tiles.lastChild);
            }

        list.forEach(function (item) {
            tiles.appendChild(createTile(item));
        });

        if (divElement) {
            body.removeChild(divElement);
        }
        body.appendChild(document.importNode(template.content, true));
        initiatePaging();
    }
    function createSearch(onSearch) {
        var body = document.body,
            fragment = document.createDocumentFragment(),
            div = document.createElement('div');
            searchBox = document.createElement("input"),
            searchButton = document.createElement("input")

        searchBox.setAttribute("type", "text");
        searchBox.setAttribute("id", "txtSearch");
        searchBox.setAttribute('class', 'col-md-6');
        searchBox.setAttribute('placeholder', 'search');

        searchButton.setAttribute("type", "button");
        searchButton.setAttribute("value", "Search");
        searchButton.addEventListener('click', function (e) {
            onSearch(searchBox.value);
        });
        div.className = "searchDiv";
        div.appendChild(searchBox);
        div.appendChild(searchButton);
        fragment.appendChild(div);
        body.appendChild(fragment);
    }
    
    function createPager() {
        var body = document.body,
            ul = document.createElement('ul'),
            pagerDiv = document.getElementById('pages'),
            li = null;
        
        pagecount = Math.round(options.totalItems.length / options.pageSize);
        
        for (var i = 0; i < pagecount; i++) {
            li = document.createElement("li");
            li.setAttribute("pageindex", i)
            li.appendChild(document.createTextNode(i + 1));
            li.addEventListener('click', function (event) {
                event.target.parentNode.childNodes.forEach(function (element) {
                    element.classList.remove("selected");
                });
                event.target.classList.add("selected");
                options.currentPageIndex = parseInt(event.target.attributes["pageindex"].value);
                displayTiles();
            });
            ul.appendChild(li);
        }

        ul.className = "pager";
        ul.childNodes.forEach(function (childNode) {
            if (childNode.attributes["pageindex"].value == options.currentPageIndex) {
                childNode.classList.add("selected");
                return;
            }
        });

        if (pagerDiv != null) {
            while (pagerDiv.firstChild) {
                pagerDiv.removeChild(pagerDiv.firstChild);
            }
            pagerDiv.appendChild(ul);
        } else {
            pagerDiv = document.createElement("div");
            pagerDiv.id = "pages";
            pagerDiv.appendChild(ul);
        }
        body.appendChild(pagerDiv);
    }
    function initialize(opt) {
        options.pageSize = opt.pageSize || options.pageSize;
        options.totalItems = opt.totalItems || options.totalItems;
        createContainersForVideo();
    }
    return {
        init: initialize,
        createSearch: createSearch
    }
})(document);