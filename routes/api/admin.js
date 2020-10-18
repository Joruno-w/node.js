const express = require('express');
const { asyncHandler } = require('./getResult');
const adminServe = require('../../services/adminService');
const jwt = require('../jwt');
const router = express.Router();

router.post('/login', asyncHandler(async (req, res) => {
    const result = await adminServe.login(req.body.loginId, req.body.loginPwd);
    jwt.publish(res, undefined, { id: result.id });
    return result;
}));


router.get('/whoami', asyncHandler(async (req, res) => {
    return await adminServe.getAdminById(req.userId);
}));

module.exports = router;
