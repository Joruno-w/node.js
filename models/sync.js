require('./Book');
require('./Student');
require('./Class');
require('./Admin');
const sequelize = require('./db');
sequelize.sync({force: true}).then(()=>{
    console.log('全部同步完成');
});
