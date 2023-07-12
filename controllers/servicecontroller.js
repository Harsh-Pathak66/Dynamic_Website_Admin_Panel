const services = require('../models/services')
const Service=require('../models/services')
const Address=require('../models/address')



exports.adminservicepage=async(req,res)=>{
    const record=await Service.find().sort({postedDate:-1})
   const totalservice=  await Service.count()
   const totalpublish= await Service.count({status:'publish'})
   const totalunpublish= await Service.count({status:'unpublish'})
    res.render('admin/service.ejs',{record,totalservice,totalpublish,totalunpublish})
}

exports.adminserviceadd=(req,res)=>{
    res.render('admin/serviceadd.ejs')
}

exports.adminservicesupdate=async(req,res)=>{
    const {sname,sdesc,sldesc}=req.body
    let currentDate= new Date()
    const filename=req.file.filename
   const record= await new Service({sname:sname, sdesc:sdesc, sldesc:sldesc, img:filename, postedDate:currentDate})
   record.save()
   res.redirect('/admin/service')

}

exports.adminservicestatusupdate=async(req,res)=>{
    const id=req.params.id
    const record=await Service.findById(id)
    let newstatus=null
    if(record.status=='unpublish'){
        newstatus='publish'
    }else{
        newstatus='unpublish'
    }
    await Service.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/service')
}

exports.adminservicedelete=async(req,res)=>{
    const id=req.params.id
    await Service.findByIdAndDelete(id)
    res.redirect("/admin/service")
}

exports.servicesmoredetails=async(req,res)=>{
    const id=req.params.id
    const addessrecord=await Address.findOne()
    const record=await  Service.findById(id)
    res.render('servicesdetails.ejs',{record,addessrecord})
}

exports.servicesearch=async(req,res)=>{
    const{status}=req.body
    const record=await Service.find({status:status}).sort({postedDate:-1})
   const totalservice=  await Service.count()
   const totalpublish= await Service.count({status:'publish'})
   const totalunpublish= await Service.count({status:'unpublish'})
    res.render('admin/service.ejs',{record,totalservice,totalpublish,totalunpublish})
}