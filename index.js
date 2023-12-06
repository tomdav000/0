const express = require('express')
const cors = require('cors')
const upload = require('express-fileupload')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(upload())
app.use('/images',express.static(path.join(__dirname,'./images')))
app.use('/api/girls',require('./routes/routes'))

if(process.env.PROD_ENV == 'production'){
	app.use(express.static('client/build'))
	const path = require('path')
	app.use('*',(req,res)=>{
		res.sendFile(path.resolve('client','build','index.html'))
	})
}

const PORT = process.env.PORT || 8701

app.listen(PORT,()=>console.log(`live on port ${PORT}`))