const connectDB = require('./src/config/database');
const express = require('express');
const app = express();
const {User} = require('./src/models/user');
const cookieParser = require('cookie-parser');


app.use(express.json()); //parse JSON for every incoming request.
app.use(cookieParser()); // parse cookies for every incoming request.

const authRouter = require('./src/routes/auth');
const profileRouter = require('./src/routes/profile');
const requestRouter = require('./src/routes/request');

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);

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


