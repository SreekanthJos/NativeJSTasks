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