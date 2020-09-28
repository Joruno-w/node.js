const allowOrigin = [
    'null',
    'http://localhost:8080'
];

module.exports = (req,res,next)=>{
    if (req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods",req.headers["access-control-request-method"]);
        res.header("Access-Control-Allow-Headers",req.headers["access-control-request-headers"]);
    }
    res.header("Access-Control-Allow-Credentials",true);
    if('origin' in req.headers && allowOrigin.includes(req.headers.origin)){
        res.header('access-control-allow-origin',req.headers.origin);
    }
    next();
}
