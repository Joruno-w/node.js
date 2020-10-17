//http://localhost:5008/data/api/local -> http://yuanjin.tech/api/local 代理
const http = require('http');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
// module.exports = (req,res,next)=>{
//     const context = '/data';
//     if (!req.path.startsWith(context)){
//         next();
//         return;
//     }
//     const path = req.path.substr(context.length);
//     console.log(path);
//     const request = http.request({
//         host: 'yuanjin.tech',
//         port: '5100',
//         headers: req.headers,
//         path,
//         method: req.method,
//     },response=>{
//         res.status(response.statusCode);
//         for (const key in response.headers) {
//             res.setHeader(key,response.headers[key]);
//         }
//         response.pipe(res);
//     });
//     req.pipe(request);
// }
const context = '/data';
module.exports = createProxyMiddleware(context,{
    target: 'http://yuanjin.tech:5100',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        return path.substr(context.length);
    }
});

