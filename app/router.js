const express = require("express");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const apiRouter = express.Router();

apiRouter.get("/", controllers.api.application.getRoot);

/**
 * @Administrator Resources 
 */

apiRouter.post("/api/admins/login",
  controllers.api.administrator.login
);

apiRouter.get("/api/admins/who-am-i",
  middlewares.admin_auth.authorize,
  controllers.api.administrator.whoAmI
);

apiRouter.get("/api/admins/:id",
  controllers.api.administrator.getAdmin
);

apiRouter.get("/api/admins",
  middlewares.admin_auth.authorize,
  controllers.api.administrator.getAllAdmins
);

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;