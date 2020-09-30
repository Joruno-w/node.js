const Admin = require('../models/Admin');
exports.addAdmin = async function (adminObj){
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
    await Admin.update(adminObj,{
       where: {
           id
       }
    });
}


exports.login = async function (loginId,loginPwd) {
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
