// import model
const Statistic = require('../models/statistic');
const { HttpError, ctrlWrapper } = require("../helpers");

const schemas = require("../schemas");

const getStatisticAll = async (req, res) => {

  const { _id } = req.user; // see authentificate.js 31 row

  const result = await Statistic.find({owner: _id}, '-createdAt -updatedAt');
  // '-createdAt -updatedAt' - for not response 'create' and 'update' fields
  //.populate('owner') - if need responce detail information instead only id

  res.status(200).json(result);

};

const getStatisticById = async (req, res) => {

    const { _id } = req.user; // see authentificate.js 31 row
    const { prescriptionId } = req.params;

    const result = await Statistic.find({owner: _id, _id: prescriptionId});

    if (result === null || result.length === 0) throw HttpError(404, "Not found");
      
    res.status(200).json(result);

};

const addStatistic = async (req, res) => {
  
    const { body } = req;
    const { error } = schemas.statisticSchema.validate(body.data);
   
    // check body data second variant
    if (error) {
      
      throw HttpError(
        400,
        `missing required ${error.message
          .split(" ")
          .filter(
            (value) =>
              value !== "is" && value !== "required" && value !== "field"
          )} field`
      );
    }
   
    const { _id } = req.user; 

    const result = await Statistic.create({...body.data, owner: _id});

    res.status(201).json(result);

};

const updateStatisticById = async (req, res) => {

    const { _id } = req.user;
    const { prescriptionId } = req.params;

    const { body } = req;
    const { error } = schemas.statisticSchema.validate(body);

    if (error) {
      throw HttpError(
        400,
        `missing required ${error.message
          .split(" ")
          .filter(
            (value) =>
              value !== "is" && value !== "required" && value !== "field"
          )} field`
      );
    }

    // find by 'owner' and id and update
    const result = await Statistic.findOneAndUpdate({owner: _id, _id: prescriptionId}, body, {new: true});

    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json(result);

};

const changeStatisticById = async (req, res) => {
   
    const { _id } = req.user; 
    const { id } = req.query;
   
    const { body } = req;
    const { error } = schemas.statisticSchema.validate(body.data);
    
    if (error) {
      throw HttpError(
        400,
        `missing ${error.message
          .split(" ")
          .filter(
            (value) =>
              value !== "is" && value !== "required" && value !== "field"
          )} field`
      );
    }

    // Replace the value of the ($set operator) field or add it if it does not exist
    const result = await Statistic.findOneAndUpdate({owner: _id, _id: id},{$set:{[body.data.key]: body.data.prop}});

    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
    
};

const deleteStatisticById = async (req, res) => {
  
    const { _id } = req.user; 
    
    const { id } = req.query;
    
    const courseName = await Statistic.findOne({owner: _id, _id: id});
    // find by owner and id and delete
    const result = await Statistic.findOneAndDelete({owner: _id, _id: id});

    if (result === null) {
     
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ message: `Prescription ${courseName.courseName} deleted` });
};

module.exports = {
    getStatisticAll: ctrlWrapper(getStatisticAll),
    getStatisticById: ctrlWrapper(getStatisticById),
    addStatistic: ctrlWrapper(addStatistic),
    updateStatisticById: ctrlWrapper(updateStatisticById),
    changeStatisticById: ctrlWrapper(changeStatisticById),
    deleteStatisticById: ctrlWrapper(deleteStatisticById),
};