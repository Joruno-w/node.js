module.exports = (req,res,next)=>{
    if (req.path.startsWith('/api')){
        next();
    }else{
        if (true){
            res.send("静态资源");
        }else{
            next();
        }
    }
}
