const mongoose=require('mongoose')


const testiSchema=mongoose.Schema({
    img:String,
    quotes:String,
    postedDate:Date,
    cname:String,
    status:{type:String,default:'unpublished'}
})



module.exports=mongoose.model('testi',testiSchema)