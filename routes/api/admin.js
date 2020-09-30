const express = require('express');
const {asyncHandler} = require('./getResult');
const adminServe = require('../../services/adminService');
const router = express.Router();
router.post('/login', asyncHandler(async (req, res) => {
    const result = await adminServe.login(req.body.loginId,req.body.loginPwd);
    req.session.loginUser = result;
    return result;
}));

module.exports = router;
