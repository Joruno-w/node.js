const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.resolve(__dirname,'../../public'));
    },
    filename: function (req, file, cb) {
        const timeStamp = Date.now();
        const extname = path.extname(file.originalname);
        const randomStr = Math.random().toString(36).slice(-6);
        cb(null, `${timeStamp}-${randomStr}${extname}`);
    }
})

const upload = multer({ storage: storage })

router.post("/", upload.single("img"),(req, res, next) => {
    res.send({
        code: 200,
        msg: '',
        data: req.file.filename
    });
});

module.exports = router;
