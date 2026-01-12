const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const {validateUserOnSignup} = require('../utils/validation');

authRouter.post('/signup', async(req,res) => {
    try {
        validateUserOnSignup(req.body);

        const {firstName , lastName , emailId , password, skills, about,gender} = req.body

       const hashPassword = await bcrypt.hash(password,10);
         const user = new User({
            firstName,
            lastName,
            emailId,
            password : hashPassword,
            skills,
            about,
            gender
         });
        await user.save();
        res.status(200).send('User added successfully');
    
    }
    catch(err) {
        res.status(400).send("Failed to save details : " +  err.message);
    }
});

authRouter.post('/login', async(req,res) => {

    const {emailId ,password} = req.body;
        try {
    
            const user = await User.findOne({emailId : emailId});
            if(!user){
                throw new Error('Invalid credentials');
            }
            const isValidPassword = await user.validatePassword(password);
            if(!isValidPassword){
                throw new Error('Invalid credentials');
            }
            else{
                const token = await user.getJWT();
                res.cookie('token',token, {expires : new Date(Date.now() + 900000)});
                res.status(200).send('Login Successful');
            }
        }
        catch(err) {
            res.status(400).send('Unable to Login : ' + err.message);
        }
    })

authRouter.post('/logout', async(req,res) => {

    res
    .cookie('token',null , {expires : new Date(Date.now())})
    .send("User has succesfully logout");
})

module.exports = authRouter ;