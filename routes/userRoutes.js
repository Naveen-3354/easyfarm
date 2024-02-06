const express = require("express");
const app = express.Router();

const {
  getAllUser,
  getByFields,
  getById,
  updateUser,
  deleteUser,
} = require("../service/userService");
const { user, admin, developer } = require("../service/productService");

app.get("/", [admin, developer], getAllUser);
app.get("/getByFields", [admin, developer], getByFields);
app.get("/getByfield", [admin, developer, user], getById);
app.put("/", [admin, developer, user], updateUser);
app.delete("/", [admin, developer, user], deleteUser);

module.exports = app;
