
const express = require('express');
const multer = require('multer');
const upload = multer({dest:'public/uploads'})
const UserModel = require('../models/user.js');
const pagination = require('../util/pagination.js');

const router = express.Router();

//管理员权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登陆</h1>')
		return;
	}
})
//显示后台首页
router.get('/',(req,res)=>{
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})
//显示用户列表
router.get('/users',(req,res)=>{
	/*
	let limit = 2;
	let { page } = req.query;
	if(isNaN(page)){
		page = 1;
	}
	if(page == 0 ){
		page = 1;
	}
	UserModel.countDocuments({})
	.then(count=>{
		
		const pages = Math.ceil(count / limit);
		if(page>pages){
			page = pages;
		}
		const list = [];
		for(let i=1;i<=pages;i++){
			list.push(i)
		}
		let skip = (page-1)*limit;
		UserModel.find({},'-password -__v')
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users,
				page:page*1,
				list
			})	
		})
	})
	*/
	const options = {
		page:req.query.page,
		model:UserModel,
		query:{},
		projection:'-password -__v',
		sort:{_id:1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page*1,
			list:data.list,
			pages:data.pages,
			url:'/admin/users'
		})	
	})
})
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	const uploadeFilePath = '/uploads/'+req.file.filename
	res.json({
		uploaded:true,
		url:uploadeFilePath
	})
})	
module.exports = router;