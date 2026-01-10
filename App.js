const connectDB = require('./config/database');
const express = require('express');
const app = express();
const User = require('./models/user');
const { ReturnDocument } = require('mongodb');

app.use(express.json()); //parse JSON for every incoming request.

// GET single user
app.get('/user', async(req,res) => {

    const userEmail = req.body.emailId;
    // using findOne to find a document
    try 
    {
        let users = await User.findOne({emailId : userEmail});
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
    const data = req.body ; 
    
    // create an instance of User model
    const user = new User(data);

    try {
        
        await user.save();
        res.status(200).send('User added successfully');
    
    }
    catch(err) {
        res.status(400).send("Failed to save details" +  err.message);
    }
});

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
    const userId = req.params._id;
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


