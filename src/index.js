const express = require('express')

const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');

const {createChannel,subscribeMessage} = require('./utils/messageQueue');
const {REMAINDER_BINDING_KEY} = require('./config/serverConfig');

const TicketController = require('./controller/ticketController');
const setupJobs = require('./utils/job');
const EmailService = require('./services/emailService');
// const emailService = new EmailService();


const setupAndStartServer=async () =>{
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    const channel = await createChannel(); 
    subscribeMessage(channel,EmailService.subscribeEvents , REMAINDER_BINDING_KEY);


    app.post('/api/v1/tickets',TicketController.create);
    app.get('/api/v1/tickets',TicketController.getAll);
    app.get('/api/v1/tickets/:id',TicketController.get);
    
    
    app.listen(PORT, ()=>{
        console.log(`server started at ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
         //setupJobs();

        // sendBasicEmail(
        //     'support@gmail.com',
        //     'remainder12566@gmail.com',
        //     'this is testing mail',
        //     'hello hope u like our service'
        // );
        
    });
}
setupAndStartServer();