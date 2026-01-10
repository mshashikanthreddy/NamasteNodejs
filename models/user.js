const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema ({
    firstName: {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 50 
    },
    lastName : {
        type : String,
        maxLength : 50
    },
    emailId : {
        type : String,
        unique : true,
        trim : true,
        required : true,
        lowercase : true,
        unique : true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Wrong Email format');
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Not A strong Password');
            }
        }

    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value) {
            if(!["male",'female','others'].includes(value)){
                throw new Error('Gender data is Invalid')
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://www.pngitem.com/middle/TiooiRo_avatar-dummy-png-transparent-png/",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error('Incorrect URL');
            }
        }
    },
    about : {
        type : String,
        default : "Here we can find details of user",
        validate(value) {
            if(value.length > 100){
                throw new Error('About should be less than 100 letters');
            }
        }
    },
    skills : {
        type : [String],
        validate(value){
            if(value.length > 10){
                throw new Error('Skills cannot be greater than 10');
            }
        }
    }
    },
    {
        timestamps : true
    }
);

const User = mongoose.model("User",userSchema);

module.exports = User;