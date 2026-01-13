const mongoose = require('mongoose');
const {Schema} = mongoose;

const connectionRequestSchema = new Schema({
    fromUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,

    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,

    },
    status : {
        type : [String],
        required : true,
        enum : {
          values :  ['interested','ignored','accepted','rejected'],
          message : '{VALUE} is invalid status type'
        }
    }
    },
    {
        timestamps : true
    }
)

// Here "pre" is a middleware which checks model before it "save" in database
connectionRequestSchema.pre('save', function() {

    // Here "this" has data of model "connectionRequestModel" and we have call next once the validation is done.
    const connectionRequest = this ;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('user cannot send request to oneself');
    }
    
})

const connectionRequestModel = mongoose.model('connectionRequest',connectionRequestSchema);

module.exports = connectionRequestModel;
