const express = require('express')
const Female = require('../models/Female')
const sequelize = require('../config/db')
const router = express.Router()

sequelize.sync().then(()=>console.log('Female Database is now N*SYnC'))
.then((err)=>console.log('Syntax Error somewhere in Female Database setup'))

router.get('/test',(req,res)=>{
	res.send('THIS IS A TEST')
})

router.get('/',async(req,res)=>{
	try{
		const girls = await Female.findAll()
		res.send(girls)
	}catch(err){
		console.log(err)
		res.status(500).send('Not Available...')
	}
})

router.get('/:id',async(req,res)=>{
	try{
		const girl = await Female.findByPk(req.params.id)
		res.send(girl)
	}catch(err){
		console.log(err)
		res.status(500).send('Not Available...')
	}
})

router.delete('/:id',async(req,res)=>{
	try{
		const girl = await Female.findByPk(req.params.id)
		if(girl){
			await girl.destroy()
			res.redirect('/api/girls')
		}
	}catch(err){
		console.log(err)
		res.status(500).send('Not Available...')
	}
})

router.put('/:id',async(req,res)=>{
	try{
		const girl = await Female.findByPk(req.params.id)
		girl.name = req.body.name;
		girl.race = req.body.race;
		let image = '';
		if(!req.files){
			return res.status(500).send('No Files Attached.')
		}
		const file = req.files.image;
		const img_name = file.name;

		if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' || file.mimetype == 'image/webp'){
			file.mv('images/'+file.name,function(err){
				if(err){
					return res.status(500).send(err)
				}
				girl.image = img_name;
				girl.save()
				res.redirect('/api/girls')
			})
		} else {
			console.log('This format is not Allow. Upload file with .png, .gif, .jpeg, or .webp')
		}
		
	}catch(err){
		console.log(err)
		res.status(500).send('Not Available')
	}
})

router.post('/',async(req,res)=>{
	try{
		const name = req.body.name;
		const race = req.body.race;
		let image = '';
		if(!req.files){
			return res.status(500).send('No Files Attached.')
		}
		const file = req.files.image;
		const img_name = file.name;

		if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' || file.mimetype == 'image/webp'){
			file.mv('images/'+file.name,function(err){
				if(err){
					return res.status(500).send(err)
				}
				const newGirl = {
					name:name,
					race:race,
					image: img_name
				}
				Female.create(newGirl)
				res.redirect('/api/girls')
			})
		} else {
			console.log('This format is not Allow. Upload file with .png, .gif, .jpeg, or .webp')
		}
		
	}catch(err){
		console.log(err)
		res.status(500).send('Not Available')
	}
})


module.exports = router;