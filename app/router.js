const express = require("express");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const apiRouter = express.Router();

apiRouter.get("/", controllers.api.application.getRoot);

/**
 * @Admin Resources 
 */

apiRouter.post("/api/admins/login",
  controllers.api.admin.login
);

apiRouter.get("/api/admins/who-am-i",
  middlewares.adminAuthorization.authorize,
  controllers.api.admin.whoAmI
);

apiRouter.get("/api/admins/:id",
  controllers.api.admin.getAdmin
);

apiRouter.get("/api/admins",
  middlewares.adminAuthorization.authorize,
  controllers.api.admin.getAllAdmins
);

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;