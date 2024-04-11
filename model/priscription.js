const {Schema, model} = require('mongoose');

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
        required: true,
        default: 'not done',
    },
    pills: {
        type: [String],
        required: true,
    },
}, {versionKey: false, timestamps: true,});

// create model on 'priscriptionSchem' base
const Priscription = model('priscription', priscriptionSchem);

module.exports = Priscription;

