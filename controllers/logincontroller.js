const Login=require('../models/login')

exports.adminlogin=(req,res)=>{
    //res.send('hello its backend ')
    res.render('admin/login.ejs',{message:'', css:''})
}

exports.logincheck=async(req,res)=>{
    const{username,password}=req.body
   const logincheck= await Login.findOne({username:username})
   if(logincheck!==null){
    if(logincheck.password==password){
        req.session.isAuth=true
        res.redirect('/admin/dashboard')
    }else{
        res.render('admin/login.ejs',{message:'Wrong Credentials', css:'danger'})
    }
   }else{
    res.render('admin/login.ejs',{message:'Wrong Credentials', css:'danger'})
   }
}

exports.dashboard=(req,res)=>{
    res.render('admin/dashboard.ejs')
}

exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin/')
}