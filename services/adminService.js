const Admin = require('../models/Admin');
const md5  = require('md5');
exports.addAdmin = async function (adminObj){
    adminObj.loginPwd = md5(adminObj.loginPwd);
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
}
exports.deleteAdmin = async function (adminId) {
    // const ins = await Admin.findByPk(adminId);
    // if (ins){
    //     await ins.destroy();
    // }
    await Admin.destroy({
        where: {
            id: adminId
        }
    });
}
exports.updateAdmin = async function (id,adminObj) {
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId;
    // await ins.save();
    if (adminObj.loginPwd){
        adminObj.loginPwd = md5(adminObj.loginPwd);
    }
    await Admin.update(adminObj,{
       where: {
           id
       }
    });
}


exports.login = async function (loginId,loginPwd) {
    loginPwd = md5(loginPwd);
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        }
    });
    if (result && result.loginId === loginId){
        return result.toJSON();
    }
    return null;
}


exports.getAdminById = async function (id) {
    const result = await Admin.findByPk({
        where: {
            id
        }
    });
    if (result){
        return result.toJSON();
    }
    return null;
}
