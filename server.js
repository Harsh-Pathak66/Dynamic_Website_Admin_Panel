const express=require('express') // function
const app=express() // module
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const adminRouter=require('./routers/adminRouter') // files location 
const frontendRouter=require('./routers/frontendRouter') // file location 
const mongoose=require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
const session=require('express-session')

app.use(session({
    secret:(process.env.KEY),
    resave:false,
    saveUninitialized:false
}))
app.use(frontendRouter) // reference then we can use it
app.use('/admin',adminRouter) // reference then we can use
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT)