const EmailService = require('../services/emailService');

const emailService = new EmailService();
const create = async (req,res)=>{
    try {
        const response = await emailService.createNotification(req.body);
       // console.log(req.body)
        return res.status(201).json({
            data:response,
            message:'successfully able to register email',
            success: true,
            err: {}

        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            message:'not able to register',
            success: false,
            err: error
        });
    }
}
const getAll = async (req,res)=>{
    try {
        const response = await emailService.getAllNotification(req.query);
       // console.log(req.body)
        return res.status(200).json({
            data:response,
            message:'successfully able to get all email',
            success: true,
            err: {}

        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            message:'not able to get all mails',
            success: false,
            err: error
        });
    }
}

const get = async (req,res)=>{
    try {
        const response = await emailService.getNotification(req.params.id);
       // console.log(req.body)
        return res.status(200).json({
            data:response,
            message:'successfully able to get email',
            success: true,
            err: {}

        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            message:'not able to get  mail',
            success: false,
            err: error
        });
    }
}
module.exports = {
    create,
    getAll,
    get
}