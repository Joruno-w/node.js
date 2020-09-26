const getMsg = require('./api/getResult');
module.exports = (err,req,res,next)=>{
    if (err){
        const error = err instanceof Error ? err.message : err
        res.status(500).send(getMsg.getErr(error));
    }else{
        next();
    }
}
