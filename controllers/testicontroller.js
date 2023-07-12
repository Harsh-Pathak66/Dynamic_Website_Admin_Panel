const Testi = require('../models/testi')
const Address=require('../models/address')



exports.testiform = async(req, res) => {
    const addessrecord=await Address.findOne()
    res.render('testiform.ejs',{addessrecord})

}

exports.testiadd = (req, res) => {
    let currentDate = new Date()
    const { cname, quotes } = req.body
    if (req.file) {
        let filename = req.file.filename
        const record = new Testi({ cname: cname, quotes: quotes, postedDate: currentDate, img: filename })
        record.save()
    } else {
        filename = 'default.png'
        const record = new Testi({ cname: cname, quotes: quotes, postedDate: currentDate, img: filename })
        record.save()
    }
    res.redirect('/')
}


exports.testipage = async (req, res) => {
    const record = await Testi.find().sort({ postedDate: -1 })
    const totaltesti=  await Testi.count()
    const totalpublish= await Testi.count({status:'publish'})
    const totalunpublish= await Testi.count({status:'unpublish'})
    res.render('admin/testipage.ejs', { record, totalpublish,totalunpublish,totaltesti,})
}


exports.testistatusupdate = async (req, res) => {
    const id = req.params.id
    const record = await Testi.findById(id)
    let newStatus = null
    if (record.status == 'unpublish') {
        newStatus = 'publish';
    } else {
        newStatus = 'unpublish';
    }
    await Testi.findByIdAndUpdate(id, { status: newStatus })
    res.redirect('/admin/testi')
}


exports.testidelete = async (req, res) => {
    const id = req.params.id
    await Testi.findByIdAndDelete(id)
    res.redirect('/admin/testi')
}

// exports.testisearch=async(req,res)=>{
//     const{status}=req.body
//     const record = await Testi.find({status:status}).sort({ postedDate: -1 })
//     const totaltesti=  await Testi.count()
//     const totalpublish= await Testi.count({status:'publish'})
//     const totalunpublish= await Testi.count({status:'unpublish'})
//     res.render('admin/testipage.ejs', { record, totalpublish,totalunpublish,totaltesti,})
// }

