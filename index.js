const fs = require('fs');
const path = require('path');
const net = require('net');
const socket = net.createConnection({
    host: 'duyi.ke.qq.com',
    port: 80
},()=>{
    console.log('连接成功!');
});
socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`);
socket.on('data',chunk=>{
    console.log(chunk.toString("utf-8"));
});



const server = net.createServer();
server.listen(9527);
server.on("listening", ()=>{
    console.log('server listen 9527');
});

server.on("connection", socket => {
    console.log('有客户端连接到服务器')
    socket.on('data',async ()=>{
        const filename = path.resolve(__dirname,'./1.jpg');
        const bodyBuffer = await fs.promises.readFile(filename);
        const headerBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpeg

`,'utf-8');
        const result = Buffer.concat([headerBuffer,bodyBuffer]);
        socket.write(result);
        socket.end();
    });
    socket.on('end',()=>{
        console.log('连接关闭');
    });
});









