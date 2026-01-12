const express = require('express');
const profileRouter = express.Router();

const userAuth = require('../middlewares/auth');
const { validateUserOnEdit, validateUpdatedPassword } = require('../utils/validation');
const bcrypt = require('bcrypt');


profileRouter.get('/profile/view', userAuth, (req,res) => {

    try {
        const user = req.user;
        res.status(200).send(user);   
    }
    catch(err){
        res.status(400).send(err.message);
    }    
});

profileRouter.patch('/profile/edit', userAuth , async (req,res) => {

    try {
        const loggedInUser = req.user; // LoggedIn user details
        const editUserDetails = req.body // "req.body" the data need to be  updated
        const isUpdateAllowed = await validateUserOnEdit(editUserDetails); 

        if(!isUpdateAllowed){
            throw new Error('Invalid Edit Request');
        }
        Object.keys(editUserDetails).forEach((key) => loggedInUser[key] =  req.body[key]);
        await loggedInUser.save();
        res.status(200).json({
            message : `${loggedInUser.firstName}, your details have been succesfully updated`,
            data : {loggedInUser}
        })
        
    }
    catch(err) {
        res.status(200).send('Error : ' + err.message);
    }
})

profileRouter.patch('/profile/password', userAuth, async(req,res) => {
    try{
        const user = req.user;
        const updatedPassword = req.body.password;

        const isValidPassword = validateUpdatedPassword(req.body);
        if(!isValidPassword){
            throw new Error('Please Enter a strong Password');
        }
        const hashedPassword = await bcrypt.hash(updatedPassword , 10);
        user.password = hashedPassword;
        const updatedDetails = await user.save();
        res.status(200).json(
            {
                message : `${user.firstName}, your password is successfully updated`,
                data : updatedDetails
            }
        )
    }
    catch(err) {
        res.status(200).send('Error : ' + err.message);
    }
})

module.exports = profileRouter ;