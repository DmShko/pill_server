const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

// crete object schema (keyword 'new' for ES6): 1st argument - object decription
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],  
    },
    email: {
        type: String,
        match: /\w{0}[0-9a-zA-Za-яА-Я]+@\w{0}[0-9a-zA-Za-яА-Я]+\.\w{0}[0-9a-zA-Za-яА-Я]/,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minLength: 8,
        required: [true, 'Set password for user'],
    },
    token:{ 
        type: String,
        default: ""
    },
    verify:{
        type: Boolean,
        default: false,
    },
    verificationCode:{
        type: String,
        default: "",
    },
},{
    versionKey: false, timestamps: true, // Disable version stamp
});

userSchema.post("save", handleMongooseError); // filter DB error

// create model : 1st argument - collection name
const User = model('user', userSchema);

module.exports = User;