const {Schema, model} = require('mongoose');

const { handleMongooseError } = require("../helpers");

// add mongoose schem
const descriptionSchem = new Schema({
    _id: {
        type: String,
        required: true,
    },
    descriptionName: {
        type: String,
        required: true,
        default: '',
    },
    description: {
        type: String,
        required: true,
        default: '',
    },
    selected: {
        type: Boolean,
        required: true,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user', // collection name
        require: true,
    },
}, {versionKey: false, timestamps: true,});

descriptionSchem.post("save", handleMongooseError);

// create model on 'prescriptionSchem' base
const Descriptions = model('description', descriptionSchem);

module.exports = Descriptions;