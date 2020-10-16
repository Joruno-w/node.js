const log4js = require('log4js');
const path = require('path');
log4js.configure({
    appenders:{
        sql: {
            type: "file",
            filename: path.resolve(__dirname,'./log/sql.log')
        },
        default: {
            type: "stdout",
        }
    },
    categories: {
        sql: {
            appenders: ["sql"],
            level: 'all'
        },
        default: {
            appenders: ["default"],
            level: 'all'
        }
    }
});

const sqlLogger = log4js.getLogger("sql");
const logger = log4js.getLogger();


module.exports = {
    sqlLogger,
    logger,
}

