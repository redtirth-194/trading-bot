import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
   
    email: {
        type: String,
        sparse: true,
    },
    password: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
     deviceToken: {
        type: String,
        required: false
    },
    currentToken: {
        type: String,
    },
   createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    
});

const User = mongoose.model('User', userSchema);
export { User };
