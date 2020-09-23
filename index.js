const express = require('express');
const app = express();
const port = 5008;
app.listen(port,()=>{
    console.log(`正在监听${port}`);
});
app.get('/news/:id',(req,res)=>{
    console.log(req.header);
    console.log(req.path);
    console.log(req.query);
    console.log(req.params);
    // res.send('123');
    // res.send([1,2,3]);
    // res.send({
    //     a: 1,
    //     b: 2
    // });
    // res.status(302).header('location','http://www.baidu.com').end();
    // res.status(302).location('http://www.baidu.com').end();
    res.redirect(302,'http://www.baidu.com');
});
