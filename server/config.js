const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: 'sh-cdb-3282xgyq.sql.tencentcdb.com',
        port: 62361,
        user: 'root',
        password: 'minishop1234',
        database: 'jinfuren',
        charset: 'utf8mb4',
        multipleStatements: true
    }
})
// const DB = require('knex')({
//     client: 'mysql',
//     connection: {
//         host: '10.159.42.38',
//         port: 3306,
//         user: 'root',
//         password: 'jDydVJ8hxAGEJ8Fg',
//         database: 'weeklyReport',
//         charset: 'utf8mb4',
//         multipleStatements: true
//     }
// })
module.exports = DB