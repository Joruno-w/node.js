const path = require('path');
const url = require('url');

module.exports = (req,res,next)=>{
    const host = req.headers.host;
    let referer = req.headers.referer;
    const extname = path.extname(req.path);
    if (![".jpg",'.png','.gif','.jpeg'].includes(extname)) {
        next();
        return;
    }
    if (referer){
        referer = url.parse(referer,true).host;
    }
    if (referer && referer !== host) {
        req.url = '/img/2.jpg';
    }
    next();
}
