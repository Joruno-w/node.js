const Student = require('../models/Student');
const Class = require('../models/Class');
Class.hasMany(Student);
Student.belongsTo(Class);
