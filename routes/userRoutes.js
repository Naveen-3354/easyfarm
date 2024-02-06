const express = require("express");
const app = express.Router();

const {
  getAllUser,
  getByFields,
  getById,
  updateUser,
  deleteUser,
} = require("../service/userService");
const { roleDev, roleUser } = require("../middleware/roleAuthorization");

app.get("/", [roleDev], getAllUser);
app.get("/getByFields", [roleDev], getByFields);
app.get("/getByfield", [roleUser], getById);
app.put("/", [roleUser], updateUser);
app.delete("/", [roleUser], deleteUser);

module.exports = app;
