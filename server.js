const Sequelize = require('sequelize');
require('dotenv').config();

const dbName = process.env.DB_NAME;
const host = process.env.DB_HOST;
const userName = process.env.DB_USER;
const password = process.env.DB_PASS;
const sequelize = new Sequelize(dbName, userName, password, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports=sequelize;