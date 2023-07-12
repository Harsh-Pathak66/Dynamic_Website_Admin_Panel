const mongoose=require('mongoose')



const addressSchema=mongoose.Schema({

    cadd:String,
    phone:Number,
    mobile:Number,
    email:String,
    insta:String,
    linkedin:String,
    twitter:String,
    snap:String
})




module.exports=mongoose.model('address',addressSchema)