function createContainersForVideo() {

    var vfragment = document.createDocumentFragment();
    var div = document.createElement('a');
    div.setAttribute('class', 'row');

    var counter = 0;
    videos.map(function (vid) {
        if (counter === 4) {
            vfragment.appendChild(document.createElement('br'));
            div.setAttribute('class', 'row');

            counter = 0;
        }
        var img = document.createElement('img');
        img.setAttribute('src', vid.thumbnail.url);
        img.setAttribute('width', vid.thumbnail.width);
        img.setAttribute('height', vid.thumbnail.height);
        var anchortag = document.createElement('a');
        anchortag.href = 'http://www.youtube.com/watch?v=' + vid.videoId;
        anchortag.appendChild(img);
        anchortag.setAttribute('class', 'col-md-3');

        var lable = document.createElement('label');
        lable.innerHTML = vid.viewCount;
        anchortag.appendChild(document.createElement('br'));
        anchortag.appendChild(lable);

        div.appendChild(anchortag);
        //  div.appendChild(lable);
        vfragment.appendChild(div);
        counter++;

    });
    document.getElementById("videos").appendChild(vfragment);

}


function getVideoStatistics(data) {

    var vid = data.items.map(function (x, ind) {
        return x.id.videoId
    }).join(',');
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = apiBaseUrl + 'videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=' + vid + '&part=snippet,statistics';
        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
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

function getDataForVideos(searchVal) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var searchUrl = apiBaseUrl + 'search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=' + searchVal;
        xhr.open('GET', searchUrl);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
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
    videos=[];
    searchResults.items.map(function (d) {
        videoInfo = {};
        stats.items.filter(function (val) {
            if (val.id === d.id.videoId) {
                videoInfo.viewCount = val.statistics.viewCount;
            }
        });
        videoInfo.videoTitle = d.snippet.title;
        videoInfo.videoId = d.id.videoId;
        videoInfo.description = d.snippet.description;
        videoInfo.publishedDate = d.snippet.publishedAt;
        videoInfo.publishedDate = d.snippet.publishedAt;
        videoInfo.thumbnail = {
            url: d.snippet.thumbnails.medium.url,
            width: d.snippet.thumbnails.medium.width,
            height: d.snippet.thumbnails.medium.height
        };
        videoInfo.author = d.snippet.channelTitle;

        videos.push(videoInfo);
    });
    createContainersForVideo();


}