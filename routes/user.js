const routes = require("express").Router();
const {Register,signin} = require("../controller/user");
routes.post("/signUp", Register);
routes.post("/signIn", signin);

module.exports = {
  user: routes
};