const express = require('express');
const app = express();
const port = 5008;
app.listen(port, () => {
    console.log(`正在监听${port}`);
});

app.use(require('./routes/staticMiddleware'));

app.get("/news", (req, res, next) => {
    console.log('handler1');
    next(new Error("abc"));
}, (err,req,res,next)=>{
    console.log('handler2');
    next();
});
app.use('/news',require('./routes/errorMiddleware'));



