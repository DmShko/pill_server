const {Schema, model} = require('mongoose');

const { handleMongooseError } = require("../helpers");

// add mongoose schem
const prescriptionSchem = new Schema({
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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user', // collection name
        require: true,
    },
}, {versionKey: false, timestamps: true,});

prescriptionSchem.post("save", handleMongooseError);

// create model on 'prescriptionSchem' base
const Prescription = model('prescription', prescriptionSchem);

module.exports = Prescription;