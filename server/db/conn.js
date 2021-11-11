const mongoose = require("mongoose");

const DB = process.env.DATABASE;

const connectionParams ={
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true ,
};

mongoose.connect(DB,connectionParams)
.then(()=>{
    console.log("CONNECTED TO DB!")
})
.catch((err)=>{
    console.log(`DB ERROR\n ${err}`);
});