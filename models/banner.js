const mongoose=require('mongoose')


const bannerSchema=mongoose.Schema({
    tittle:String,
    desc:String,
    ldesc:String,
    img:String
})


module.exports=mongoose.model('banner',bannerSchema)