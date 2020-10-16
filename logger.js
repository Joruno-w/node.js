const log4js = require('log4js');
const path = require('path');

function getCommonAppender(pathSeg){
    return {
        type: "dateFile",
        filename: path.resolve(__dirname,'logs',pathSeg,"logging.logs"),
        daysToKeep: 3,
        maxLogSize: 1024*1024,
        layout: {
            type: "pattern",
            pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
        }
    }
}

log4js.configure({
    appenders:{
        sql: getCommonAppender("sql"),
        default: {
            type: "stdout",
        },
        api:getCommonAppender("api")
    },
    categories: {
        sql: {
            appenders: ["sql"],
            level: 'all'
        },
        default: {
            appenders: ["default"],
            level: 'all'
        },
        api: {
            appenders: ["api"],
            level: 'all'
        }
    }
});


process.on("exit",()=>{
    log4js.shutdown();
});

const sqlLogger = log4js.getLogger("sql");
const logger = log4js.getLogger();
const apiLogger = log4js.getLogger('api');


module.exports = {
    sqlLogger,
    logger,
    apiLogger
}

