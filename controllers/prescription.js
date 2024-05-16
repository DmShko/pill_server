// import model
const Prescription = require('../models/prescription');
const { HttpError, ctrlWrapper } = require("../helpers");

const schemas = require("../schemas");

const getAll = async (req, res) => {

  const { _id } = req.user; // see authentificate.js 31 row

  const result = await Prescription.find({owner: _id}, '-createdAt -updatedAt');
  // '-createdAt -updatedAt' - for not response 'create' and 'update' fields
  //.populate('owner') - if need responce detail information instead only id

  res.status(200).json(result);

};

const getById = async (req, res) => {

    const { _id } = req.user; // see authentificate.js 31 row
    const { prescriptionId } = req.params;
    const result = await Prescription.find({owner: _id, _id: prescriptionId});

    if (result === null || result.length === 0) throw HttpError(404, "Not found");
      
    res.status(200).json(result);

};

const addById = async (req, res) => {
    
    const { body } = req;
    const { error } = schemas.prescriptionSchema.validate(body.data);

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

    const result = await Prescription.create({...body.data, owner: _id});

    res.status(201).json(result);

};

const updateById = async (req, res) => {

    const { _id } = req.user;
    const { prescriptionId } = req.params;

    const { body } = req;
    const { error } = schemas.prescriptionSchema.validate(body);

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
    const result = await Prescription.findOneAndUpdate({owner: _id, _id: prescriptionId}, body, {new: true});

    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json(result);

};

const changeById = async (req, res) => {

    const { _id } = req.user; 
    const { prescriptionId } = req.params;

    const { body } = req;
    const { error } = checkShemaStatus.validate(body);

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

    const result = await Contact.findOneAndUpdate({owner: _id, _id: prescriptionId},{$set:{[Object.keys(body)[0]]: body[Object.keys(body)[0]]}});

    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(await Contact.findById(contactId));
    
};

const deleteById = async (req, res) => {
  
    const { _id } = req.user; 
    
    const { id } = req.query;
    
    const courseName = await Prescription.findOne({owner: _id, _id: id});
    // find by owner and id and delete
    const result = await Prescription.findOneAndDelete({owner: _id, _id: id});

    if (result === null) {
     
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ message: `Prescription ${courseName.courseName} deleted` });
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addById: ctrlWrapper(addById),
    updateById: ctrlWrapper(updateById),
    changeById: ctrlWrapper(changeById),
    deleteById: ctrlWrapper(deleteById),
};