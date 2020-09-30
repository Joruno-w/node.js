const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const stuRouter = require('./routes/api/student');
const cookieParser = require('cookie-parser');
const filename = path.resolve(__dirname, './public');
const app = express();
const port = 5008;

app.listen(port, () => {
    console.log(`正在监听${port}`);
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    name: 'sessionid',
    secret: 'wsl'
}));
app.use(express.static(filename));
app.use(cookieParser());
app.use(require('./routes/tokenMiddleware'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/api/student', require('./routes/api/student'));
app.use('/api/admin',require('./routes/api/admin'));
app.use(require('./routes/errorMiddleware'));
