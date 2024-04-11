const express = require('express');

const controllers = require('../../controllers/priscription');

// create most routes
const pillsRouter = express.Router();

pillsRouter.get("/", controllers.getAll);
pillsRouter.get("/:id", controllers.getById);
pillsRouter.post("/", controllers.addById);
pillsRouter.put("/", controllers.updateById);
pillsRouter.patch("/", controllers.changeById);
pillsRouter.delete("/", controllers.deleteById);

// export to app
module.exports = pillsRouter;