const express = require('express');

// joi schemas
const schemas = require('../../schemas');
const { authentificate, validateBody } = require('../../middlewares');

const controllers = require('../../controllers/auth');

// create most routes
const authRouter = express.Router();

// singUp
authRouter.post("/signup", validateBody(schemas.checkRegister), controllers.signup);

// singIn
authRouter.post("/signin", validateBody(schemas.checkLogin), controllers.login);

// verificate (get reg from user email)
authRouter.get("/verify/:verificationCode", controllers.verifyEmail);

// verify againe if the letter did not arrive
authRouter.post("/verify", validateBody(schemas.emailSchema), controllers.resendVerifyEmail);

// logOut
authRouter.post("/logout", authentificate, controllers.logout);

// get current user
authRouter.get("/current", authentificate, controllers.getCurrent);

// export to app
module.exports = authRouter;