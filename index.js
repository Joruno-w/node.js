const express = require('express');
const app = express();
const port = 5008;
app.listen(port,()=>{
    console.log(`正在监听${port}`);
});

app.get("*",()=>{
    console.log("abc123");
});
