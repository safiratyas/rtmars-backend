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

/**
 * @Citizen Resources 
 */

apiRouter.post("/api/citizens/register",
  middlewares.citizen_condi.checkCondition,
  controllers.api.citizen.register
);

apiRouter.post("/api/citizens/login",
  controllers.api.citizen.login
);

apiRouter.put("/api/citizens/update/data",
  controllers.api.citizen.updateCitizen
);

apiRouter.delete("/api/citizens/destroy/data",
  controllers.api.citizen.deleteCitizen
);

apiRouter.get("/api/citizens/who-am-i",
  middlewares.admin_auth.authorize,
  controllers.api.citizen.whoAmI
);

apiRouter.get("/api/citizens/:id",
  controllers.api.citizen.getCitizen
);

apiRouter.get("/api/citizens",
  middlewares.admin_auth.authorize,
  controllers.api.citizen.getAllCitizens
);

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;