const {getErr} = require('./api/getResult');
const {pathToRegexp} = require('path-to-regexp');
const needToToken = [
    {method: 'POST',path: '/api/student'},
    {method: 'GET',path: '/api/student'},
    {method: 'PUT',path: '/api/student/:id'}
];
module.exports = (req,res,next)=>{
    const apis = needToToken.filter(api=>{
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
    });
    if (apis.length === 0){
        next();
        return;
    }
    if (req.session.loginUser) {
        next();
    }else{
        handleNoToken(req,res,next);
    }
}

function handleNoToken(req,res,next){
    res.status(403).send(getErr("you don't have any token access api" ,403));
}
