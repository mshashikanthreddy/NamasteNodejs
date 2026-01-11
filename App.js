const connectDB = require('./src/config/database');
const express = require('express');
const app = express();
const {User} = require('./src/models/user');
const {validateUser} = require('./src/utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userAuth = require('./src/middlewares/auth');
const { ReturnDocument } = require('mongodb');

app.use(express.json()); //parse JSON for every incoming request.
app.use(cookieParser()); // parse cookies for every incoming request.

// GET single user
app.get('/user', userAuth, async(req,res) => {

    const _id = req.body._id;
    // using findOne to find a document
    try 
    {
        let users = await User.findById(_id);
        if(users.length === 0)
        {
            res.status(404).send('user not found');
        }
        else
        {
            res.status(200).send(users);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
    
})

// Create an API /feed for getting all users data

app.get('/feed', async(req,res) => {
    
    try{
        let users = await User.find({});
        if(users.length === 0){
            res.status(404).send('No users found');
        }
        else{
            res.status(200).send(users);
        }
    }
    catch(err){
        res.status(400).send(err.message);
    }

})

// Post API
app.post('/signup', async(req,res) => {
    /* Here we are sending body through 'postman' which parses into JS object
     If we do not use parser the req.body gives undefined*/

    try {
        validateUser(req.body);

        const {firstName , lastName , emailId , password} = req.body

        // bcrypt the passwords before storing to database
       const hashPassword = await bcrypt.hash(password,10);
         const user = new User({
            firstName,
            lastName,
            emailId,
            password : hashPassword
         });
        await user.save();
        res.status(200).send('User added successfully');
    
    }
    catch(err) {
        res.status(400).send("Failed to save details" +  err.message);
    }
});

// login API
app.post('/login', async(req,res) => {

    const {emailId ,password,} = req.body;
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

//Delete API
app.delete('/user', async(req,res) => {
    const userId = req.body.userId;

    try{
    //const user = await User.findByIdAndDelete(userId);
    const user = await User.findOneAndDelete({_id:userId});
    if(!user)
    {
        res.status(404).send('user not found');
    }
    else
    {
        res.status(200).send(deletedCount);
    }
    }
    catch(err){
        res.status(400).send(err);
    }
})

// update which is already there in schema
app.patch('/user/:userId',async(req,res) => {
    const userId = req.params.userId;
    const data = req.body;

    try{

        const ALLOWED_USER = ['skills','photoUrl','about'];

        const isUpdateAllowed = Object.keys(data).every((k) => {
            ALLOWED_USER.includes(k);
        })

        if(!isUpdateAllowed){
            throw new Error('These fields Cannot be updated');
        }

        //update user details and returns the document before update
        const previousUser = await User.findByIdAndUpdate({_id:userId},data,
            {ReturnDocument:"before", 
            runValidators : true});
        if(!previousUser){
            res.status(404).send('user not found');
        }
        else{
            res.status(200).send(previousUser);
        }
    }
    catch(err){
        res.status(400).send(err.message);
    }
})



connectDB()
    .then(() =>{
        console.log("Database is connected successfully");
    app.listen(3000,() =>{
        console.log('Server is successfully listening on port 3000');
    })
    })   
    .catch((err) => {
        console.log(err.message);
    })


