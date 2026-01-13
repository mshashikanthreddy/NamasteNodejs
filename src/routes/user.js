const express = require('express');
const userAuth = require('../middlewares/auth');
const userRouter = express.Router();

const connectionRequestModel = require('../models/connectionRequest');
const SAFE_USER_DETAILS = "firstName lastName age gender skills about photoUrl";

userRouter.get('/user/requests/received' , userAuth , async(req,res) => {

    try{
        const loggedInUser = req.user;

        const connectionRequestReceived = await connectionRequestModel.find({
            toUserId : loggedInUser._id,
            status : "interested"
        })//here we will get details of requestSender and we can manage what we want from that.
        .populate("fromUserId", SAFE_USER_DETAILS );
        
        res
        .status(200)
        .json({
            message : `These are the connection requests you received`,
            connectionRequestReceived
        })
    }
    catch(err){
        res
        .status(404)
        .json({
            message : `ERROR : ${err.message}`
        })
    }
})

userRouter.get('/user/connections' , userAuth , async(req,res) => {
    try{
        const loggedInUser = req.user;
        
        const userConnections = await connectionRequestModel.find({
            $or : [
                {toUserId : loggedInUser._id , status : "accepted"},
                {fromUserId : loggedInUser._id , status : "accepted"}
            ]
        })
        .populate("fromUserId", SAFE_USER_DETAILS)
        // .populate("toUserId", SAFE_USER_DETAILS);

        // const data = await userConnections.map((row) => {
        // if(row.fromUserId._id.toString() === loggedInUser._id){
        //     return row.toUserId;
        // }
        // return row.fromUserId;
    //})
    res
    .status(200)
    .json({
        message : "These are the connections of your account",
        userConnections
    })   
    }
    catch(err){
        res
        .status(404)
        .json({
            message : `ERROR : ${err.message}`
        })
    }
})

module.exports = userRouter;