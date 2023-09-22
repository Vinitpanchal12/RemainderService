const express = require('express')

const bodyParser = require('body-parser');
//const apiRoutes = require('./routes/index');
//const db = require('./models/index');
const {sendBasicEmail} = require('./services/emailService')
const {PORT} = require('./config/serverConfig');

const setupAndStartServer=() =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    //app.use('/api',apiRoutes);
    
    app.listen(PORT, ()=>{
        console.log(`server started at ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }

        // sendBasicEmail(
        //     'support@gmail.com',
        //     'remainder12566@gmail.com',
        //     'this is testing mail',
        //     'hello hope u like our service'
        // );
        
    })
}
setupAndStartServer();