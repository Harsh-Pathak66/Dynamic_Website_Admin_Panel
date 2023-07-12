const Query=require('../models/query')
const nodemailer=require('nodemailer')

exports.add=(req,res)=>{
      const{email,query}=req.body
      const record=new Query({email:email,query:query})
      record.save()
      console.log(record)
}

exports.pageshow=async(req,res)=>{
 const record= await Query.find()
    res.render('admin/query.ejs',{record})

}

exports.queryreplyform=async(req,res)=>{
    const id=req.params.id
    const record=await Query.findById(id)
      res.render('admin/queryreplyform.ejs',{record})
}


exports.queryemailsend=async(req,res)=>{
      const id=req.params.id
      const{emailto,emailfrom,subject,body}=req.body
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'fullstackproject12@gmail.com', // generated ethereal user
          pass: 'vpvunpakzqsyygfu', // generated ethereal password
        },
      });
      console.log('Connected To SMTP Server')
      let info = await transporter.sendMail({
        from:emailfrom, // sender address
        to: emailto, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        //html: "<b>Hello world?</b>", // html body
      });
      console.log('email sent')
      await Query.findByIdAndUpdate(id,{status:'Replied'})
      res.redirect('/admin/query')
}