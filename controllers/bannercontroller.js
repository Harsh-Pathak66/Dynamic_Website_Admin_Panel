const banner = require('../models/banner')
const Banner=require('../models/banner')
const Address=require('../models/address')


exports.adminbanner=async(req,res)=>{
      const  record=await banner.findOne()
      res.render('admin/banner.ejs',{record})
}

exports.adminupdatebannerform=async(req,res)=>{
      const id=req.params.id
      const record=await Banner.findById(id)
      res.render('admin/bannerform.ejs',{record})
}

exports.bannerupdate=async(req,res)=>{
 const id=req.params.id
 const {bt,bd,bld}=req.body
 if(req.file){
      const filename=req.file.filename
      await Banner.findByIdAndUpdate(id,{tittle:bt,desc:bd,ldesc:bld,img:filename})
 }else{
 await Banner.findByIdAndUpdate(id,{tittle:bt,desc:bd,ldesc:bld})
 }
 res.redirect('/admin/banner')
}

exports.bannermoredetails=async(req,res)=>{
      const record=await Banner.findOne()
      const addessrecord=await Address.findOne()
      res.render('bannermore.ejs',{record,addessrecord})
}








