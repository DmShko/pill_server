const {Schema, model} = require('mongoose');

const { handleMongooseError } = require("../helpers");

// add mongoose schem
const statisticSchem = new Schema({
   
    pillName: {
        type: String,
        required: [true, '_id is required'],
    },

    day: {
        type: Object,
        required: [true, 'Pill is required'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user', // collection name
        require: true,
    },

}, {versionKey: false, timestamps: true,});

statisticSchem.post("save", handleMongooseError);

// create model on 'prescriptionSchem' base
const Statistic = model('statistic', statisticSchem);

module.exports = Statistic;