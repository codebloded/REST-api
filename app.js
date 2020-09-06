const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
require('dotenv').config()
const router = require('./routes/formRoute')

const app = express();
const hostName ='localhost';
const port = '4000';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//========================MONGOOSE:- MONGO( DB CONNECTION WITH NODE================
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECT_DB ,({ useUnifiedTopology: true ,useNewUrlParser: true } ));
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>{
    console.log("Conneted Sucessfully to the mongo server");
});



app.get('/', (req,res)=>{
    res.send("Hey i am here ");
})
app.use('/post', router);


//LISTENING THE SERVER
app.listen(port, () => {
    console.log(`The server is up and running at http://${hostName}:${port}`);
})

