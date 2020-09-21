const Student = require('../models/Student');
exports.addStudent = async function (StudentObj) {
    const ins = await Student.create(StudentObj);
    return ins.toJSON();
}
exports.deleteStudent = async function (StudentId) {
    // const ins = await Student.findByPk(StudentId);
    // if (ins){
    //     await ins.destroy();
    // }
    await Student.destroy({
        where: {
            id: StudentId
        }
    });
}
exports.updateStudent = async function (id,StudentObj) {
    // const ins = await Student.findByPk(id);
    // ins.loginId = StudentObj.loginId;
    // await ins.save();
    await Student.update(StudentObj,{
        where: {
            id
        }
    });
}
