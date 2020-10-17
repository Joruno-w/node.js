const getMsg = require('./api/getResult');
const multer = require('multer');
module.exports = (err,req,res,next)=>{
    if (err){
        if (err instanceof multer.MulterError){
            res.status(500).send(getMsg.getErr("multerError",500));
            return;
        }
        const error = err instanceof Error ? err.message : err
        res.status(500).send(getMsg.getErr(error));
    }else{
        next();
    }
}
