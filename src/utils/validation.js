const validator = require('validator');

const validateUser = (data) => {
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

module.exports = {validateUser};