const {Schema, model} = require('mongoose');

const { handleMongooseError } = require("../helpers");

// add mongoose schem
const prescriptionSchem = new Schema({
    _id: {
        type: String,
        required: false,
    },
    courseName: {
        type: String,
        required: false,
        default: '',
    },
    doctorName: {
        type: String,
        required: false,
        default: '',
    },
    docContacts: {
        type: String,
        required: false,
        default: '',
    },
    clinicName: {
        type: String,
        required: false,
        default: '',
    },
    clinicContacts: {
        type: String,
        required: false,
        default: '',
    },
    visitDate: {
        type: String,
        required: false,
        default: '',
    },
    created: String,
    status: {
        type: [String],
        enum: ['done', 'not active', 'not done'],
        required: [true, 'Status is required'],
        default: 'not done',
    },
    selected: {
        type: Boolean,
        required: false,
        default: '',
    },
    pills: {
        type: [Object],
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