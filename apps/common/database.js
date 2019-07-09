var Sequelize = require("sequelize");

// var pool = new Pool({
//     host:      config.get("postgresql_local.host"),
//     user:      config.get("postgresql_local.user"),
//     password:  config.get("postgresql_local.password"),
//     database:  config.get("postgresql_local.database"),
//     port:      config.get("postgresql_local.port")
// })
var url = 'postgres://postgres:root@localhost:5432/Lotte_Name'
var database = new Sequelize(url);

module.exports = database;