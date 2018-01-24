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
        searchButton.setAttribute("id", "btnSearch");
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
    function addEvent(li){
        li.addEventListener('click', function (event) {
            event.target.parentNode.childNodes.forEach(function (element) {
                element.classList.remove("selected");
            });
            event.target.classList.add("selected");
            options.currentPageIndex = parseInt(event.target.attributes["pageindex"].value);
            displayTiles();
        });
        return li;
    }

    function createPager() {
        var body = document.body,
            ul = document.createElement('ul'),
            pagerDiv = document.getElementById('pages'),
            li = null;
        
        pagecount = Math.round(options.totalItems.length / options.pageSize);
        li = document.createElement("li");
        li.appendChild(document.createTextNode('<<'));
        li.setAttribute("pageindex", 0); 
        ul.appendChild(addEvent(li));

        for (var i = 0; i < pagecount; i++) {
            li = document.createElement("li");
            li.setAttribute("pageindex", i);          
            li.appendChild(document.createTextNode(i + 1));           
            ul.appendChild(addEvent(li));
        }
        li = document.createElement("li");
        li.appendChild(document.createTextNode('>>'));
        li.setAttribute("pageindex", 3); 
        ul.appendChild(addEvent(li));
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
var myApp = myApp || {};
myApp.http = (function(){

    function httpGetAsync(url){
        return new Promise(function(resolve, reject){
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, true);
            xmlHttp.onload = function(){
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resolve(xmlHttp.responseText);
                }else{
                    reject(xmlHttp.statusText);
                }
            };
            xmlHttp.onerror = function(){
                reject(xmlHttp.statusText);
            };
            xmlHttp.send();
        });
    }

    return {
        get: httpGetAsync
    };
})();
var myApp = myApp || {};


myApp.main = (function (service, ui) {

    var DEFAULT_PAGESIZE = 4;

    function processData(data) {
        videos = [];
        data.items.forEach(function (d) {
            videos.push({
                videoId: d.id.videoId,
                title: d.snippet.channelTitle,
                description: d.snippet.description,
                publishedDate: d.snippet.publishedAt,
                imgUrl: d.snippet.thumbnails.medium.url,
                viewsCount: d.statistics ? d.statistics.viewCount : 0,
            });
        });

        ui.init({ totalItems: videos, pageSize: DEFAULT_PAGESIZE });


    }

    function performSearch(value) {
        service.search(value).then(function (response) {
            processData(response);
        });

    }
    function init() {
        ui.createSearch(performSearch);
    }
    init();
})(myApp.service, myApp.ui);

MathUtils=function(){};
MathUtils.prototype.sum = function(number1, number2) {
        return number1 + number2;
}
 
MathUtils.prototype.substract = function(number1, number2) {
    return number1 - number2;
}
 
MathUtils.prototype.multiply = function(number1, number2) {
    return number1 * number2;
}
 
MathUtils.prototype.divide = function(number1, number2) {
    return number1 / number2;
}
 
MathUtils.prototype.average = function(number1, number2) {
    return (number1 + number2) / 2;
}
 
MathUtils.prototype.factorial = function(number) {
    if (number < 0) {
        throw new Error("There is no factorial for negative numbers");
    } else if (number == 1 || number == 0) {
        return 1;
    } else {
        return number * this.factorial(number - 1);
    }
}
var myApp = myApp || {};
var VIDEO_URL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q='
var STATS_URL = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id='

myApp.service = (function (http) {
    function getVideoStatistics(data) {
        var url = STATS_URL + data + '&part=snippet,statistics';
        return http.get(url);
    }

    function getDataForVideos(searchVal) {
        var searchUrl = VIDEO_URL + searchVal;
        return http.get(searchUrl);
    }
    function search(value) {
        var videosList = [],
            Ids = [];
       return getDataForVideos(value).then(function (response) {
            videosList = JSON.parse(response);
            videosList.items.forEach(function (item) {
                Ids.push(item.id.videoId);
            });
            return getVideoStatistics(Ids);
        }).then(function (response) {
            var statisticsResult = JSON.parse(response);
            videosList.items.forEach(function (item) {
                statisticsResult.items.forEach(function (stats) {
                    if (stats.id == item.id.videoId) {
                        item.statistics = stats.statistics;
                        return;
                    }
                });
            });
            return videosList;
        });
    }
    return {
        search: search
    }
})(myApp.http);