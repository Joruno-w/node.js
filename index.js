const http = require('http');
const path = require('path');
const fs = require('fs');
const URL = require('url');

const request = http.request('http://duyi.ke.qq.com',{method: "GET"},res => {
    console.log(res.headers);
    console.log(res.url);
    let result = '';
    res.on("data", chunk => {
        result += chunk.toString('utf-8');
    });
    res.on("end", ()=>{
        console.log(result);
    });
});
request.end();

async function exists(filename){
    try {
        return await fs.promises.stat(filename);
    }catch (e) {
        return null;
    }
}

async function getFileContent(url){
    const urlObj = URL.parse(url);
    let filename = path.resolve(__dirname,'public',urlObj.pathname.substring(1));
    let stat = await exists(filename);
    if (!stat){
        //没有这个文件
        return null;
    }else if (stat.isDirectory()){
        //是一个目录
        filename = path.resolve(__dirname,'public',urlObj.pathname.substring(1),'index.html');
        stat = await exists(filename);
        if (!stat){
            return null;
        }else{
            return await fs.promises.readFile(filename);
        }
    }else {
        //有这个文件
        return await fs.promises.readFile(filename);
    }
}

async function handler(req,res) {
    const content = await getFileContent(req.url);
    if (content){
        res.write(content);
    }else{
        res.statusCode = 404;
        res.write('Resource is not exist');
    }
    res.end();
}
const server = http.createServer(handler);

server.listen(12306);
server.on("listening", ()=>{
    console.log('server listening!');
})



