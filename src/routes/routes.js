const { Router } = require("express");

//Controllers
const authController = require("../app/controllers/authController");
const acaiController = require("../app/controllers/acaiController");
const additionalController = require("../app/controllers/additionalController");
const saleController = require("../app/controllers/saleController");

//Middlewares
const authMiddleware = require("../app/middlewares/auth");
const authorizationMiddleware = require("../app/middlewares/authorization");

const routes = Router();

routes.get("/", (req, res) => {
  const api = {
    author: "Lucas Oliveira Santos",
    name: "projeto-acai-api",
    version: "1.0.0",
    license: "MIT",
    gitAddres: "https://github.com/Losantosw/projeto-acai-api"
  };
  return res.json(api);
});


routes.use(authMiddleware);

//user
routes.post("/auth/register", authorizationMiddleware, authController.store);
routes.post("/auth/authenticate", authorizationMiddleware, authController.store);
routes.post("/auth/forgot_password", authorizationMiddleware, authController.store);
routes.post("/auth/reset_password", authorizationMiddleware, authController.store);

//acais
routes.post("/acais", authorizationMiddleware, acaiController);
routes.get("/acais", authorizationMiddleware, acaiController);
routes.get("/acais/:id", authorizationMiddleware, acaiController);
routes.put("/acais/:id", authorizationMiddleware, acaiController);
routes.delete("/acais/:id", authorizationMiddleware, acaiController);

//additionals
routes.post("/additionals", authorizationMiddleware, additionalController);
routes.get("/additionals", authorizationMiddleware, additionalController);
routes.get("/additionals/:id", authorizationMiddleware, additionalController);
routes.put("/additionals/:id", authorizationMiddleware, additionalController);
routes.delete("/additionals/:id", authorizationMiddleware, additionalController);

//sale
routes.post("/sale", saleController);
routes.get("/sale", saleController);
routes.get("/sale/:id", saleController);
routes.put("/sale/:id", saleController);
routes.delete("/sale/:id", saleController);


module.exports = routes;