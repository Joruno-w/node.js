const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('./student.ejs',{
        number: 123
    });
});

module.exports = router;