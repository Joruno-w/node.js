function jsonp(url) {
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    script.onload = function () {
        script.remove();
    }
}

function callback(data) {
    console.log(JSON.parse(data));
}

jsonp('http://localhost:5008/api/student');
