const HttpRequest = require('./request');

const request = new HttpRequest('http://duyi.ke.qq.com');


request.send();

request.on('res',(headers,body)=>{
    console.log(headers);
    console.log(body);
})

