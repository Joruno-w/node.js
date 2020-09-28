const express = require('express');
const path = require('path');
const cors = require('cors');
const stuRouter = require('./routes/api/student');
const cookieParser = require('cookie-parser');
const filename = path.resolve(__dirname, './public');
const app = express();
const port = 5008;

app.listen(port, () => {
    console.log(`正在监听${port}`);
});
const whiteList = ['null','http://localhost:8080'];
app.use(
    cors({
        origin(origin, callback) {
            if (whiteList.includes(origin)) {
                callback(null, origin)
            } else {
                callback(new Error("not allowed"));
            }
        },
        credentials: true
    }));
app.use(express.static(filename));
app.use(cookieParser());
app.use(require('./routes/tokenMiddleware'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/api/student', stuRouter);
app.use(require('./routes/errorMiddleware'));
app.post('/api/student', (req, res) => {
    console.log(req.body);
});

