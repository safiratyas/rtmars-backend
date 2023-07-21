const express = require("express");
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const apiRouter = express.Router();
const uploadOnMemory = require("../config/uploadOnMemory")

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
  middlewares.admin_auth.authorize,
  controllers.api.administrator.getAdmin
);

apiRouter.get("/api/admins",
  // middlewares.admin_auth.authorize,
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

apiRouter.post("/api/citizens/create/data",
  middlewares.citizen_auth.authorize,
  controllers.api.administrator.createCitizen
);

apiRouter.put("/api/citizens/update/profile/:id",
  middlewares.citizen_auth.authorize,
  controllers.api.citizen.updateProfile
);

apiRouter.delete("/api/citizens/destroy/data",
  middlewares.admin_auth.authorize,
  controllers.api.citizen.deleteCitizen
);

apiRouter.get("/api/citizens/who-am-i",
  middlewares.citizen_auth.authorize,
  controllers.api.citizen.whoAmI
);

apiRouter.get("/api/citizens/:id",
  middlewares.citizen_auth.authorize,
  controllers.api.citizen.getCitizen
);

apiRouter.get("/api/citizens",
  middlewares.admin_auth.authorize,
  controllers.api.citizen.getAllCitizens
);

/**
 * @Religion Resources 
 */

apiRouter.get("/api/religions/:id",
  controllers.api.religion.getReligion
);

apiRouter.get("/api/religions",
  controllers.api.religion.getAllReligions
);

apiRouter.delete("/api/religions/destroy/data",
  controllers.api.religion.deleteReligion
);

/**
 * @Education Resources 
 */

apiRouter.get("/api/educations/:id",
  controllers.api.education.getEducation
);

apiRouter.get("/api/educations",
  controllers.api.education.getAllEducations
);

apiRouter.delete("/api/educations/destroy/data",
  controllers.api.education.deleteEducation
);

/**
 * @Job Resources 
 */

apiRouter.get("/api/jobs/:id",
  controllers.api.job.getJob
);

apiRouter.get("/api/jobs",
  controllers.api.job.getAllJobs
);

apiRouter.delete("/api/jobs/destroy/data",
  controllers.api.job.deleteJob
);

/**
 * @BloodType Resources 
 */

apiRouter.get("/api/bloods/:id",
  controllers.api.blood_type.getBloodType
);

apiRouter.get("/api/bloods",
  controllers.api.blood_type.getAllBloods
);

apiRouter.delete("/api/bloods/destroy/data",
  controllers.api.blood_type.deleteBloodType
);

/**
 * @Upload Resources
 */
apiRouter.put(
  "/api/citizens/picture/:id/cloudinary",
  middlewares.citizen_auth.authorize,
  uploadOnMemory.single("picture"),
  controllers.api.image.uploadPhoto,
);

apiRouter.post(
  "/api/citizens/picture/citizen/cloudinary",
  middlewares.admin_auth.authorize,
  uploadOnMemory.single("picture"),
  controllers.api.image.uploadPhotoCitizen,
);

/**
 * @Document Resources 
 */

apiRouter.post("/api/citizens/documents/create",
  middlewares.citizen_auth.authorize,
  middlewares.document_condi.checkCondition,
  controllers.api.document.createDocument
);

apiRouter.get("/api/documents",
  middlewares.citizen_auth.authorize,
  controllers.api.document.getAllDocuments
);

apiRouter.get("/api/documents/:id",
  middlewares.citizen_auth.authorize,
  controllers.api.document.getDocument
);

apiRouter.delete("/api/documents/destroy/data/:id",
  middlewares.citizen_auth.authorize,
  controllers.api.document.deleteDocument
);

/**
 * @Agenda Resources 
 */

apiRouter.post("/api/citizens/agendas/create",
  middlewares.admin_auth.authorize,
  controllers.api.agenda.createAgenda
);

apiRouter.get("/api/agendas",
  controllers.api.agenda.getAllAgenda
);

/**
 * @Notifications Resources 
 */

apiRouter.get("/api/notifications",
  middlewares.admin_auth.authorize,
  controllers.api.notification.getAllNotification
);

apiRouter.use(controllers.api.application.handleNotFound);

module.exports = apiRouter;