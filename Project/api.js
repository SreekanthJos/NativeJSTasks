
function getVideoStatistics(data) {
    var vid = data.items.map(function (x, ind) { return x.id.videoId }).join(',');
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = apiBaseUrl + 'videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=' + vid + '&part=snippet,statistics';
        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            }
            else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();

    });

}
//title with link on youtube, preview, description, author, published date, count of views
var apiBaseUrl = 'https://www.googleapis.com/youtube/v3/';
var searchResults = [];
var videos = [];
var videoInfo = {
    videoTitle: '',
    videoId: '',
    publishedDate: '',
    preview: '',
    author: '',
    description: '',
    viewCount: ''
};
var stats=[];
function getDataForVideos(searchVal) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var searchUrl = apiBaseUrl + 'search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=' + searchVal;
        xhr.open('GET', searchUrl);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            }
            else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();

    });
}

function processData() {
    searchResults.items.map(function (d) {
        videoInfo={};
        stats.items.filter(function (val) {
            if (val.id === d.id.videoId) {
                videoInfo.viewCount=val.statistics.viewCount;
            }
        });
        videoInfo.videoTitle = d.snippet.title;
        videoInfo.videoId = d.id.videoId;
        videoInfo.description = d.snippet.description;
        videoInfo.publishedDate = d.snippet.publishedAt;
        videoInfo.publishedDate = d.snippet.publishedAt;
        videoInfo.preview = d.snippet.thumbnails.medium.url;
        videoInfo.author = d.snippet.channelTitle;
        videos.push(videoInfo);
    });


}