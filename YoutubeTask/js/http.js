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