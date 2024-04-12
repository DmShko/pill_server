const express = require('express');

// joi schemas
const schemas = require('../schemas');
const validateBody = require('../../middlewares');
const authentificate = require('../../middlewares');

const controllers = require('../../controllers/prescription');

// create most routes
const authRouter = express.Router();

// singUp
authRouter.post("/signup", validateBody(schemas.checkRegister), controllers.signup);

// singIn
authRouter.post("/signin", validateBody(schemas.checkLogin), controllers.login);

// verificate
authRouter.get("/verify/:verificationCode", controllers.verifyEmail);

// verify againe if the letter did not arrive
authRouter.post("/verify", validateBody(schemas.emailSchema), controllers.resendVerifyEmail);

// logOut
authRouter.post("/logout", authentificate, controllers.logout);

// get current user
authRouter.get("/current", authentificate, controllers.getCurrent);

// get current user
authRouter.patch("/subscription", authentificate, validateBody(schemas.checkSchemaSubscription), controllers.updateSubscriptionUser);

// export to app
module.exports = authRouter;