// import model
const Descriptions = require('../models/descriptions');
const { HttpError, ctrlWrapper } = require("../helpers");

const schemas = require("../schemas");

const getDescriptionAll = async (req, res) => {

  const { _id } = req.user; // see authentificate.js 31 row

  const result = await Descriptions.find({owner: _id}, '-createdAt -updatedAt');
  // '-createdAt -updatedAt' - for not response 'create' and 'update' fields
  //.populate('owner') - if need responce detail information instead only id

  res.status(200).json(result);

};

const getDescriptionById = async (req, res) => {

    const { _id } = req.user; // see authentificate.js 31 row
    const { descriptionId } = req.params;
    const result = await Descriptions.find({owner: _id, _id: descriptionId});

    if (result === null || result.length === 0) throw HttpError(404, "Not found");
      
    res.status(200).json(result);

};

const addDescription = async (req, res) => {
    
    const { body } = req;
    const { error } = schemas.descriptionSchema.validate(body.data);
  
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
  
    const result = await Descriptions.create({...body.data, owner: _id});

    res.status(201).json({ message: `Created` });

};

const updateDescriptionById = async (req, res) => {
 
    const { _id } = req.user;
    const { id } = req.query;
  
    const { body } = req;

    const { error } = schemas.descriptionSchema.validate(body.data);
    
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
    const result = await Descriptions.findOneAndUpdate({owner: _id, _id: id}, body.data, {new: true});
   
    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json({ message: `Description ${result.descriptionName} updated` });

};

const deleteDescriptionById = async (req, res) => {
   
    const { _id } = req.user; 
    
    const { id } = req.query;
   
    const descriptionName = await Descriptions.findOne({owner: _id, _id: id});
    // find by owner and id and delete
    const result = await Descriptions.findOneAndDelete({owner: _id, _id: id});

    if (result === null) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ message: `Description ${descriptionName.descriptionName} deleted` });
};

module.exports = {
    getDescriptionAll: ctrlWrapper(getDescriptionAll),
    getDescriptionById: ctrlWrapper(getDescriptionById),
    addDescription: ctrlWrapper(addDescription),
    updateDescriptionById: ctrlWrapper(updateDescriptionById),
    deleteDescriptionById: ctrlWrapper(deleteDescriptionById),
};