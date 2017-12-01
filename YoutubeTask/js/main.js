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
