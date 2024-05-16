const express = require('express');
const { validateBody, authentificate } = require('../../middlewares');

const controllers = require('../../controllers/prescription');

// joi schemas
const schemas = require('../../schemas');

// create most routes
const pillsRouter = express.Router();

pillsRouter.get("/", authentificate, controllers.getAll);
pillsRouter.get("/:id", authentificate, controllers.getById);
pillsRouter.post("/", authentificate, validateBody(schemas.prescriptionSchema), controllers.addById);
pillsRouter.put("/:id", authentificate, validateBody(schemas.prescriptionSchema), controllers.updateById);
pillsRouter.patch("/:id", authentificate, validateBody(schemas.prescriptionSchema), controllers.changeById);
pillsRouter.delete("/", authentificate, validateBody(schemas.prescriptionSchema), controllers.deleteById);

// export to app
module.exports = pillsRouter;