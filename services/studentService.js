const Student = require('../models/Student');
const {Op} = require('sequelize');
const Class = require('../models/Class');
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

exports.getAllStudents = async function () {
    const result = await Student.findAll();
    return JSON.stringify(result);
}

exports.getStudentByPage = async function (page=1,limit=10,sex=-1,name='') {
    const where = {}
    if (sex!==-1){
        where.sex = !!sex;
    }
    if (name){
        where.name = {
            [Op.like]: `%${name}%`
        }
    }
    const result = await Student.findAndCountAll({
        attributes: ['id','name','sex','birthday'],
        where,
        include: [Class],
        offset: (page - 1) * limit,
        limit: +limit
    });
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows))
    }
}

exports.getStudentById = async function (id) {
    const result = await Student.findByPk(id);
    if (result){
        return result.toJSON();
    }
    return null;
}

