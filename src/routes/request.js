const express =  require('express');
const requestRouter = express.Router();
const User = require('../models/user');
const connectionRequestModel = require('../models/connectionRequest');

const userAuth = require('../middlewares/auth');


requestRouter.post('/request/send/:status/:toUserId', userAuth , async (req,res) => {

    try{
        const user = req.user;
        const fromUserId = user._id;
        const connectionRequestStatus = req.params.status;
        const toUserId = req.params.toUserId;

        const allowedStatus = ['interested','ignored'];
        if(!allowedStatus.includes(connectionRequestStatus)){
            return res.status(400).send("please send valid request");
        }

        const toUserExists = await User.findById(toUserId);
        if(!toUserExists){
            return res.status(400).json({message : "Invalid connection request"});
        }

        const existingConnectionRequest = await connectionRequestModel.findOne({
           $or : [
            { toUserId : toUserId , fromUserId : fromUserId},
            {toUserId : fromUserId , fromUserId : toUserId}
           ] 
        })
        if(existingConnectionRequest){
            return res
                .status(400)
                .json({message : "Already send the Request"});
        }

        //Here we are creating the new instance of model 'connectionRequestModel'
        const connectionRequest = new connectionRequestModel({
            fromUserId : fromUserId,
            toUserId : toUserId ,
            status : connectionRequestStatus
        })

        // Here it checks the connectionRequest schema "pre" middleware if it sending request to same user or not.
        const data = await connectionRequest.save();

        res
        .status(200)
        .json({
            message : `${user.firstName} is ${connectionRequestStatus} in ${toUserExists.firstName}`,
            data
        })    
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

requestRouter.post('/request/review/:status/:requestId', userAuth , async (req,res) => {

    try{
        const loggedInUser = req.user;
        const {status , requestId } = req.params;

        const allowedStatus = ['accepted','rejected'];
        if(!allowedStatus.includes(status)){
        throw new Error('Inavlid status request');
        }

        const connectionRequest =  await connectionRequestModel.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        })
        if(!connectionRequest){
            throw new Error('Invalid connection request');
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res
        .status(200)
        .json({
            message : `${loggedInUser.firstName} is ${status} request`,
            data
        })
    }
    catch(err){
        res
        .status(200)
        .json({
            message : `ERROR : ${err.message}`
        })

    }

})

module.exports = requestRouter;


