const express = require('express');
const { validateBody, authentificate } = require('../../middlewares');

const controllers = require('../../controllers/statistic');

// joi schemas
const schemas = require('../../schemas');

// create most routes
const statisticRouter = express.Router();

statisticRouter.get("/", authentificate, controllers.getStatisticAll);
statisticRouter.get("/:id", authentificate, controllers.getStatisticById);
statisticRouter.post("/", authentificate, validateBody(schemas.statisticSchema), controllers.addStatistic);
statisticRouter.put("/:id", authentificate, validateBody(schemas.statisticSchema), controllers.updateStatisticById);
statisticRouter.patch("/", authentificate, validateBody(schemas.statisticSchema), controllers.changeStatisticById);
statisticRouter.delete("/", authentificate, validateBody(schemas.statisticSchema), controllers.deleteStatisticById);

// export to app
module.exports = statisticRouter;