const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticketRepository');
  
class EmailService{
    constructor(){
        this.ticketRepository = new TicketRepository();
    }
    async sendBasicEmail (mailFrom,mailTo,mailSubject,mailBody) {
        sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody
        });
    }
    
    async fetchPendingEmails(timestamp){
        try {
            const response = await this.ticketRepository.getPending({status:"PENDING"});
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async createNotification(data){
        try {
            //console.log(data);
            const response =  await this.ticketRepository.create(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateTicket(ticketId,data){
        try {
            //console.log(data);
            const response =  await this.ticketRepository.update(ticketId,data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllNotification(data){
        try {
            //console.log(data);
            const response =  await this.ticketRepository.getAll(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getNotification(ticketId){
        try {
            //console.log(data);
            const response =  await this.ticketRepository.get(ticketId);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
} 
module.exports =EmailService;