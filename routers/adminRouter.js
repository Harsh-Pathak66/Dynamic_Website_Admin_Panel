const router =require('express').Router()
const { Router } = require('express')
const loginC=require('../controllers/logincontroller')
const bannerC=require('../controllers/bannercontroller')
const serviceC=require('../controllers/servicecontroller')
const testiC=require('../controllers/testicontroller')
const addressC=require('../controllers/addresscontroller')
const queryC=require('../controllers/querycontroller')
const login = require('../models/login')
const multer=require('multer')
const Address=require('../models/address')
const nodemailer=require('nodemailer')




function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin/')
    }
}

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload')
    },

    filename:function(req,file,cb){
     cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({
    storage:storage,
    limits:{fileSize:4*1024*1024}
})


router.get('/',loginC.adminlogin)
router.post('/',loginC.logincheck)
router.get('/dashboard',handlelogin,loginC.dashboard)
router.get('/logout',loginC.logout)
router.get('/banner',bannerC.adminbanner)
router.get('/bannerform/:id',bannerC.adminupdatebannerform)
router.post('/bannerform/:id',upload.single('img'),bannerC.bannerupdate)
router.get('/service',serviceC.adminservicepage)
router.get('/serviceadd',serviceC.adminserviceadd)
router.post('/serviceadd',upload.single("img"),serviceC.adminservicesupdate)
router.get('/servicestatusupdate/:id',serviceC.adminservicestatusupdate)
router.get('/servicedelete/:id',serviceC.adminservicedelete)
router.get('/testi',testiC.testipage)
router.get('/testistatusupdate/:id',testiC.testistatusupdate)
router.get('/testidelete/:id',testiC.testidelete)
router.get('/address',addressC.addresspage)
router.get('/addupdate/:id',addressC.addressupdateform)
router.post('/addupdate/:id',addressC.addresspageupdate)
router.get('/query',queryC.pageshow)
router.get('/queryreplyform/:id',queryC.queryreplyform)
router.post('/queryreplyform/:id',queryC.queryemailsend)
router.post('/service',serviceC.servicesearch)
// router.post('/testi',testiC.testisearch)


module.exports=router