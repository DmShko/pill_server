const express = require('express');
const { validateBody, authentificate } = require('../../middlewares');

const controllers = require('../../controllers/description');

// joi schemas
const schemas = require('../../schemas');

// create most routes
const descriptionRouter = express.Router();

descriptionRouter.get("/", authentificate, controllers.getDescriptionAll);
descriptionRouter.get("/:id", authentificate, controllers.getDescriptionById);
descriptionRouter.post("/", authentificate, validateBody(schemas.descriptionSchema), controllers.addDescription);
descriptionRouter.put("/", authentificate, validateBody(schemas.descriptionSchema), controllers.updateDescriptionById);
descriptionRouter.delete("/", authentificate, validateBody(schemas.descriptionSchema), controllers.deleteDescriptionById);

// export to app
module.exports = descriptionRouter;