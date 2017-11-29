var searchBox = document.createElement("input")
searchBox.setAttribute("type", "text");
searchBox.setAttribute("id", "txtSearch");

document.getElementById("main").appendChild(searchBox);



document.getElementById("txtSearch").onchange = function () {

    getData().then(function(data){
        console.log(data);
    })
}


getData = function (searchVal) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=js';
        xhr.open('GET', url);
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


