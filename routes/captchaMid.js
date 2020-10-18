const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');

router.get('/captcha', function (req, res) {
    const captcha = svgCaptcha.createMathExpr({
        color: true,
        noise: 6,
    });
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});

function validateCaptcha(req,res,next) {
    const captcha = req.session.captcha ? req.session.captcha.toLowerCase() : "";
    if (captcha !== req.body.captcha){
        res.send({
            code: 401,
            msg: '验证码有问题',
        });
    }else{
        next();
    }
    req.session.captcha = "";
}


function captchaHandler(req,res,next){
    console.log(req);
    if (!req.session.records){
        req.session.records = [];
    }
    const duration = 10000;
    const repeat = 3;
    const now = Date.now();
    req.session.records.push(now);
    req.session.records = req.session.records.filter(time=>now - time <= duration);
    if (req.session.records.length >= repeat){
        validateCaptcha(req,res,next);
    }else{
        next();
    }
}

router.post("*",captchaHandler);
router.put("*",captchaHandler);


module.exports = router;
