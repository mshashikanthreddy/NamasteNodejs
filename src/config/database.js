const dotenv = require("dotenv");
dotenv.config({path :'./src/config/.env'}); // Here we have give correct 'path' to access .env file.

const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@backend-projects.ewiwyeo.mongodb.net/devTinder`)
}

module.exports =  connectDB;

