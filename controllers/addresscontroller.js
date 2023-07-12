const Address=require('../models/address')



exports.addresspage=async(req,res)=>{
    const record=  await Address.findOne()
      res.render('admin/address.ejs',{record})
}

exports.addressupdateform=async(req,res)=>{
    const id=req.params.id
    const record=await Address.findById(id)
    res.render('admin/addform.ejs',{record})
}

exports.addresspageupdate=async(req,res)=>{
    const id=req.params.id
    const{ca,cp,cm,ce,ci,cl,ct,cs}=req.body
    await Address.findByIdAndUpdate(id,{cadd:ca,phone:cp, mobile:cm, email:ce, insta:ci, linkedin:cl, twitter:ct, snap:cs})
    res.redirect('/admin/address')
}