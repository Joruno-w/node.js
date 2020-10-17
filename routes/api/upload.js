const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const jimp = require('jimp');
async function mark(waterFile,originFile,targetFile,proportion=5,marginProportion=0.05){
    const [origin,water] = await Promise.all([jimp.read(originFile),jimp.read(waterFile)]);
    const curProportion = origin.bitmap.width / water.bitmap.width;
    water.scale(curProportion / proportion);
    const right = origin.bitmap.width * marginProportion;
    const bottom = origin.bitmap.height * marginProportion;
    const x = origin.bitmap.width - right - water.bitmap.width;
    const y = origin.bitmap.height - bottom - water.bitmap.height
    origin.composite(water,x,y,{
        mode: jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.3
    });
    await origin.write(targetFile);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.resolve(__dirname,'../../public/origin'));
    },
    filename: function (req, file, cb) {
        const timeStamp = Date.now();
        const extname = path.extname(file.originalname);
        const randomStr = Math.random().toString(36).slice(-6);
        cb(null, `${timeStamp}-${randomStr}${extname}`);
    }
})

const upload = multer({ storage })
const waterPath = path.resolve(__dirname,'../../public/img/water.jpg');
router.post("/", upload.single("img"),async (req, res, next) => {
    //添加水印
    const targetPath = path.resolve(__dirname,'../../public',req.file.filename);
    await mark(waterPath,req.file.path,targetPath);
    res.send({
        code: 200,
        msg: '',
        data: req.file.filename
    });
    next();
});

module.exports = router;
