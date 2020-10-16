const cookieKey = 'token';
const jwt = require('jsonwebtoken');
const secret = 'wangshengliang';
//颁发jwt
exports.publish = function(res,maxAge = 3600 * 24, info={}){
    const token = jwt.sign(info,secret,{
        expiresIn: maxAge
    });
    //存入cookie
    res.cookie(cookieKey,token,{
        maxAge: maxAge * 1000,
        path: '/'
    });
    res.header('authorization',token);
}

exports.verify = function (req) {
    let token;
    token = req.cookies[cookieKey];
    if (!token){
        token = req.headers.authorization;
        if (!token){
            return null;
        }
        token = token.split(" ");
        token = token.length === 1?token[0] : token[1];
    }
    try {
        const result = jwt.verify(token,secret);
        return result;
    }catch{
        return null;
    }
}
