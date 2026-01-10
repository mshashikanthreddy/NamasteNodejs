const connectDB = require('./config/database');
const express = require('express');
const app = express();
const User = require('./models/user');

app.post('/signup', async(req,res) => {
    const dataObj = {
    firstName : "jaswanth",
    lastName : "Reddy",
    emailId : "jaswanth@gmail.com",
    password : "jaswanth@123"
}

// create an instance of User model
const user = new User(dataObj);

    try {
        await user.save();
        res.status(200).send('User added successfully');
    
    }
    catch(err) {
        res.status(400).send("Failed to add details", err.message);
    }
});

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


