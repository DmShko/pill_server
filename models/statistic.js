const {Schema, model} = require('mongoose');

const { handleMongooseError } = require("../helpers");
// const { boolean } = require('joi');

// add mongoose schem
const statisticSchem = new Schema({

    _id: {
        type: String,
        required: [true, '_id is required'],
    },

    pillName: {
        type: String,
        required: [true, 'pillName is required'],
    },

    dateNumber: {
        type: String,
        required: [true, 'dateNumber is required'],
    },

    month: {
        type: String,
        required: [true, 'month is required'],
    },

    done: {
        type: Number,
        required: [true, 'done is required'],
    },

    status: {
        type: Boolean,
        required: [true, 'status is required'],
    },

    reschedule: {
        type: Boolean,
        required: [true, 'reschedule is required'],
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