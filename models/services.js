const mongoose = require('mongoose')




const serviceSchema=mongoose.Schema({
    sname:String,
    img:String,
    sdesc:String,
    sldesc:String,
    status:{type:String,default:'unpublish'},
    postedDate:Date
})





module.exports=mongoose.model('service',serviceSchema)