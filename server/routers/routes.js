const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");

require("../db/conn");

const User = require("../models/userSchema");

//REGISTER ROUTE
router.post("/register",async (req,res)=>{
    // console.log(req.body);
    // res.send(req.body);

    //destructuring ES6
   const {username,name,password} =  req.body;

   if(!username || !name || !password){
        return res.status(400).json({error:"All fields are required!!"});
       console.log("Please Fill All Fields!");
   }
   try{

    const userExist = await User.findOne({username:username});

        if(userExist){

            console.log("User already Exist!!");
            return res.status(422).json({error:"User already Exist!!"});
        }
        else{
            const hashedPass = await bcryptjs.hash(password,12);
            console.log("Hashed: ",hashedPass);
            if(hashedPass){
                const newUser = new User({username,name,password:hashedPass});
                const isSave = await newUser.save();
                console.log(isSave)
                return res.status(201).json({error:"User register Successfully!!"});
            }
            
        }
        
   }
   catch(err){
       console.log(err);
   }

});



//LOGIN ROUTE
router.post("/login", async(req,res)=>{

    const {username,password}  = req.body;
    
    if(!username || !password){
        return res.status(400).json({error:"All fields are required!!"});
    }
    
    try{
        const isRegistered = await User.findOne({username:username}); 

        if(isRegistered){  
            const passMatch = await bcryptjs.compare(password,isRegistered.password);
            if(passMatch){ 
                res.json({message:"Logged in Successfully!!"});
                console.log("LOGIN SUCCESSFULLY");
            }
            else{
                res.status(401).json({error:"Invalid Password!!"});
                console.log("INCORRECT PASSWORRD!");
                
            }
        }
        else{
            res.status(400).json({error:"No such user found!!"});
            console.log("REGISTER FIRST");
        }
    }
    catch(err){
        console.log(err);
    }
});

module.exports =  router;