const express = require('express');
const {getResult,asyncHandler} = require('./getResult');
const router = express.Router();
const stuServe = require('../../services/studentService');
router.get('/',asyncHandler(async (req,res)=>{ // 获取学生
    return await stuServe.getAllStudents();
}));

router.get('/:id',asyncHandler(async (req,res)=>{
    return await stuServe.getStudentById(req.params.id);
}));

router.post('/',asyncHandler(async (req,res)=>{ // 添加学生
    return await stuServe.addStudent(req.body);
}));

router.put('/:id',asyncHandler(async (req,res)=>{
    return await stuServe.updateStudent(req.params.id,req.body);
}));
router.delete('/:id',asyncHandler(async (req,res)=>{
    return await stuServe.deleteStudent(req.params.id);
}));

module.exports = router;
