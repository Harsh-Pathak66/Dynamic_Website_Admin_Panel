const router=require('express').Router()
const multer=require('multer')
const loginC=require('../controllers/logincontroller')
const bannerC=require('../controllers/bannercontroller')
const serviceC=require('../controllers/servicecontroller')
const testiC=require('../controllers/testicontroller')
const addressC=require('../controllers/addresscontroller')
const queryC=require('../controllers/querycontroller')
const Banner=require('../models/banner')
const Service=require('../models/services')
const Testi=require('../models/testi')
const Address=require('../models/address')


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
  

router.get('/',async(req,res)=>{
      const record= await Banner.findOne()
      const servicerecord=await Service.find({status:'publish'})
      const testirecord=await Testi.find({status:'publish'})
      const addessrecord=await Address.findOne()
       res.render('index.ejs',{record,servicerecord,testirecord,addessrecord})
})
 

router.post('/',queryC.add)
router.get('/bannerlong',bannerC.bannermoredetails)
router.get('/testi',testiC.testiform)
router.post('/testii',upload.single('img'),testiC.testiadd)
router.get('/servicedetails/:id',serviceC.servicesmoredetails)




module.exports=router