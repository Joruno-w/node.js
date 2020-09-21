const Admin = require('../models/Admin');
exports.addAdmin = async function (adminObj) {
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
