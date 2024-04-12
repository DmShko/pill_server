const express = require('express');

const controllers = require('../../controllers/prescription');

// joi schemas
const schemas = require('../schemas');
const validateBody = require('../../middlewares');

// create most routes
const pillsRouter = express.Router();

pillsRouter.get("/", controllers.getAll);
pillsRouter.get("/:id", controllers.getById);
pillsRouter.post("/", validateBody(schemas.prescriptionShema), controllers.addById);
pillsRouter.put("/", validateBody(schemas.prescriptionShema), controllers.updateById);
pillsRouter.patch("/", validateBody(schemas.prescriptionShema), controllers.changeById);
pillsRouter.delete("/", validateBody(schemas.prescriptionShema), controllers.deleteById);

// export to app
module.exports = pillsRouter;