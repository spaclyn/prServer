const { DataTypes } = require("sequelize")
const db = require("../db")

const Entry = db.define("entry", {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    program: {
        type: DataTypes.STRING,
        allowNull: true
    },
    platform: {
        type: DataTypes.STRING,
        allowNull: true
    },
    medium: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    details: {
        type: DataTypes.STRING,
        allowNull: true
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


module.exports = Entry

