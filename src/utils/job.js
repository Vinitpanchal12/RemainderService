const cron = require('node-cron');
const EmailService = require('../services/emailService');
const sender = require('../config/emailConfig');

const emailService = new EmailService();

const setupJobs = ()=> {
    cron.schedule('*/1 * * * *',async ()=>{
        const response = await emailService.fetchPendingEmails();
        console.log(response);
        response.forEach((email) => {
           sender.sendMail({   
                from: 'remainderservice12566@gmail.com',
                to:email.recepientEmail,
                subject:email.subject,
                text:email.content
            }, async(err,data) =>{
                if(err){
                    console.log(Error);
                }else{
                    console.log(data);
                    await emailService.updateTicket(email.id, {status:"SUCCESS"});
                }
           });
        });
        console.log(response);
    });
}

module.exports = setupJobs;