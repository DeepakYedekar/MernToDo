const routes = require("express").Router();
const { GetItems, DeleteItem, CreateItem } = require("../controller/item");
const auth = require('../middleware/auth');
routes.get("/", GetItems);
routes.post("/add",auth, CreateItem);
routes.delete("/:id",auth, DeleteItem);

module.exports = {
  item: routes
};