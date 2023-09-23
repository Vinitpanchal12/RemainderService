const express = require('express')

const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
//const setupJobs = require('./utils/job')

const TicketController = require('./controller/ticketController');
const setupJobs = require('./utils/job');

const setupAndStartServer=() =>{
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets',TicketController.create);
    
    
    app.listen(PORT, ()=>{
        console.log(`server started at ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
         setupJobs();

        // sendBasicEmail(
        //     'support@gmail.com',
        //     'remainder12566@gmail.com',
        //     'this is testing mail',
        //     'hello hope u like our service'
        // );
        
    });
}
setupAndStartServer();