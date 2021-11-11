const express = require('express');
const app = express();
const cors = require('cors');

//FOR ACCESSING SECRET KEYS 
const dotenv = require('dotenv');
dotenv.config({path:"./config.env"});

const PORT = process.env.PORT; 

app.use(cors());
app.use(express.json());

//routes Middleware
app.use(require('./routers/routes'));

app.get("/",(req,res)=>{
    res.send("HOMEPAGE");
});



app.listen(PORT,()=>{
    console.log(`SERVER RUNNING AT PORT:${PORT}`);
});