//'use strict';
(function () {
    var searchBox = document.createElement("input")
    searchBox.setAttribute("type", "text");
    searchBox.setAttribute("id", "txtSearch");
    document.getElementById("main").appendChild(searchBox);

    document.getElementById("txtSearch").onchange = function () {
        getDataForVideos(this.value).then(function (data) {
            searchResults = JSON.parse(data);            
            getVideoStatistics(searchResults).then(function (response) {
                stats=JSON.parse(response);
                processData();
            });
        })
    }

})();




