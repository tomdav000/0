require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB,process.env.ROOT,process.env.PW,{
	host:process.env.HOST,
	dialect:'mysql'
})

sequelize.authenticate().then(()=>console.log('Authenticated Database'))
.catch((err)=>console.log('Database Not Authenticated',err))

module.exports = sequelize;