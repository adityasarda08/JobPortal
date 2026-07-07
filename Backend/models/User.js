const mongoose = require('mongoose');
const { type } = require('node:os');
const { ref } = require('node:process');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {    
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },  
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {     
        type: String,
        enum: ['Student', 'Employer'],
        default: 'Student',
        required: true,
    },
    profile: {
        bio: {
            type: String,
        },
        skills: [{
            type: String,
        }],
        resume:{
            type: String, //url to resume file
        },
        resumeOriginalName: {
            type: String, //original name of the resume file
        },
            companyName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
        ProfilePhoto: {
            type: String, //url to profile photo
            default : " ",

        },

    },

},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;