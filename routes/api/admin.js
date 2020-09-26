const express = require('express');
const {asyncHandler} = require('./getResult');
const adminServe = require('../../services/adminService');
const router = express.Router();
router.get('/login', asyncHandler(async (req, res) => { // 分页获取学生
    const result = await adminServe.login(req.body.loginId,req.body.loginPwd);
    if (result){
        const value = result.id;
        res.cookie('token',value,{
            path: '/login',
            domain: 'localhost',
            maxAge: 7 * 24 * 3600,
        });
        res.header('authorization',value);
    }
    return result;
}));

module.exports = router;
