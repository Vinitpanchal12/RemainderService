const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticketRepository');
const ticketRepository = new TicketRepository();
// class EmailService{
//     constructor(){
//         this.ticketRepository = new TicketRepository();
//         //this.emailService = new EmailService();
//     }
    const sendBasicEmail= async (mailFrom,mailTo,mailSubject,mailBody)=> {
        sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody
        });
    }
    
    const  fetchPendingEmails = async(timestamp) =>{
        try {
            const response = await ticketRepository.getPending({status:"PENDING"});
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    const  createNotification= async (data)=>{
        try {
            //console.log(data);
            const response =  await ticketRepository.create(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const subscribeEvents =async(payload) =>{
        let service = payload.service;
        let data = payload.data;
        switch (service) {
            case 'CREATE_TICKET':
                await createNotification(data);
                break;
            case 'SEND_BASIC_MAIL':
                await sendBasicEmail(data);
                break;
            default:
                console.log('no valid event');
                break;
        }
    }

    const  updateTicket= async(ticketId,data)=>{
        try {
            //console.log(data);
            const response =  await ticketRepository.update(ticketId,data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const getAllNotification= async(data) =>{
        try {
            //console.log(data);
            const response =  await ticketRepository.getAll(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const getNotification= async(ticketId)=>{
        try {
            //console.log(data);
            const response =  await ticketRepository.get(ticketId);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

module.exports ={
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    subscribeEvents,
    updateTicket,
    getAllNotification,
    getNotification
};