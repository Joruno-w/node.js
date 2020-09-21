const Class = require('../models/Class');
exports.addClass = async function (ClassObj) {
    const ins = await Class.create(ClassObj);
    return ins.toJSON();
}
exports.deleteAdmin = async function (ClassId) {
    // const ins = await Admin.findByPk(adminId);
    // if (ins){
    //     await ins.destroy();
    // }
    await Class.destroy({
        where: {
            id: ClassId
        }
    });
}
exports.updateAdmin = async function (id,ClassObj) {
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId;
    // await ins.save();
    await Class.update(ClassObj,{
        where: {
            id
        }
    });
}
