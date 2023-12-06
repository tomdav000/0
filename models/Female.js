const sequelize = require('../config/db')
const { Sequelize, DataTypes } = require('sequelize')

const Female = sequelize.define('Female',{
	name:{
		type: DataTypes.STRING
	},
	race:{
		type: DataTypes.STRING
	},
	image:{
		type: DataTypes.STRING
	}
})

module.exports = Female;