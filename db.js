const Sequelize = require('sequelize')
const sequelize = new Sequelize("postgres://postgres:81b8c61aa9d94800a597ab810aa9d771@localhost:5432/progress-report")


module.exports = sequelize