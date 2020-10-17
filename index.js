const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const filename = path.resolve(__dirname, './public');
const app = express();
const port = 5008;

app.listen(port, () => {
    console.log(`正在监听${port}`);
});
app.use(require('./routes/imgProtectMid'));
app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            callback(null, "*");
            return;
        }
        callback(null,origin);
    },
    credential: true
}));
app.use(express.static(filename));
app.use(cookieParser());
app.use(require('./routes/tokenMiddleware'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(require('./routes/apiLoggerMid'));
app.use('/res',require("./routes/api/download"));
app.use('/api/student', require('./routes/api/student'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/upload',require('./routes/api/upload'));
app.use(require('./routes/errorMiddleware'));
