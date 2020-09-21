const Mock = require('mockjs');
const result = Mock.mock({
    "datas|500-700":[
        {
            name: "@cname",
            birthday: "@date",
            "sex|1": false,
            mobile: /^1\d{10}$/,
            "ClassId|1-20":1
        }
    ]
}).datas;
const Student = require('../models/Student');
Student.bulkCreate(result);
