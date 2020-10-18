const QRcode = require('qrcode');
QRcode.toFile("./code.png","abc123",err=>{
    if (err){
        console.log(err);
    }
})
QRcode.toDataURL('http://ke.qq.com',(err,url)=>{
    if (err){
        console.log(err);
    }else{
        console.log(url);
    }
});
