const {Schema, model} = require('mongoose');

const { handleMongooseError } = require("../helpers");

// add mongoose schem
const priscriptionSchem = new Schema({
    doctor: {
        type: { name: String, phone: String, workTime: String},
        required: false,
    },
    clinic: {
        type: { name: String, phone: String, workTime: String},
        required: false,
    },
    created: String,
    status: {
        type: [String],
        enum: ['done', 'suspended', 'not done'],
        required: [true, 'Status is required'],
        default: 'not done',
    },
    pills: {
        type: [String],
        required: [true, 'Pills is required'],
    },
}, {versionKey: false, timestamps: true,});

priscriptionSchem.post("save", handleMongooseError);

// create model on 'priscriptionSchem' base
const Priscription = model('priscription', priscriptionSchem);

module.exports = Priscription;