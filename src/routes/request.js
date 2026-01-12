const express =  require('express');
const requestRouter = express.Router();

const userAuth = require('../middlewares/auth');


requestRouter.post('/sendConnectionRequest', userAuth , (req,res) => {

    try{
        const user = req.user;
        res.status(200).send(user.firstName + 'send the connection request');
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = requestRouter;


