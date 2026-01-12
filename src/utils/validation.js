const validator = require('validator');

const validateUserOnSignup = (data) => {
    const {firstName , lastName , emailId, password} = data;
    

    if(!firstName && !lastName){
        throw new Error('please fill the mandatory details')
    } 
    else if(!validator.isEmail(emailId)){
        throw new Error('Enter a Valid EmailId');
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error('Enter a strong password');
    }
}

const validateUserOnEdit = async (data) => {

        const allowedEditFields = ['firstName','lastName','about','age','photoUrl','skills'];

        const isUpdateAllowed = await Object.keys(data).every((key) => allowedEditFields.includes(key));

        console.log(isUpdateAllowed);

        return isUpdateAllowed;
    
}

const validateUpdatedPassword = async(data) => {

    const {password} = data; // we must destructure the field because "data" is an object,
    // we have to pass only string to validate password.
        const isValidPassword = await validator.isStrongPassword(password);
        return isValidPassword;
    
}

module.exports = {
    validateUserOnSignup,
    validateUserOnEdit,
    validateUpdatedPassword
};