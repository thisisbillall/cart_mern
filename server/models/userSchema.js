const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username:{
        type:String,
        require:true,
        unique:true,
    },

    name:{
        type:String,
        require:true,
    },

    password:{
        type:String,
        require:true,
    },
    
});

// userSchema.pre('save',);
const User = mongoose.model('USER',userSchema);
module.exports = User;