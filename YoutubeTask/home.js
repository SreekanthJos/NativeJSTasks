//'use strict';
//(function () {
//title with link on youtube, preview, description, author, published date, count of views
var apiBaseUrl = 'https://www.googleapis.com/youtube/v3/';
var searchResults = [];
var videos = [];
var videoInfo = {
    videoTitle: '',
    videoId: '',
    publishedDate: '',
    thumbnail: {
        url: '',
        width: '',
        height: ''
    },
    author: '',
    description: '',
    viewCount: ''
};
var stats = [];

var fragment = document.createDocumentFragment();
var div = document.createElement('div');
var divVideos = document.createElement('div');
divVideos.setAttribute('id','videos');
div.setAttribute('class', 'row');

//div.appendChild(document.createElement('span'));
var searchBox = document.createElement("input")
searchBox.setAttribute("type", "text");
searchBox.setAttribute("id", "txtSearch");
searchBox.setAttribute('class', 'col-md-6');
searchBox.setAttribute('placeholder', 'search');
div.appendChild(searchBox);

// div.appendChild(document.createElement('span'));
fragment.appendChild(div);
fragment.appendChild(divVideos);


document.getElementById("main").appendChild(fragment);

document.getElementById("txtSearch").onchange = function () {
document.getElementById("videos").innerHTML='';

    getDataForVideos(this.value).then(function (data) {
        searchResults = JSON.parse(data);
        getVideoStatistics(searchResults).then(function (response) {
            stats = JSON.parse(response);
            processData();
        });
    })
}

//})();