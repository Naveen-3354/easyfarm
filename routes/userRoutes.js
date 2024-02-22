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

app.get("/", [], getAllUser);
app.get("/getByFields", [], getByFields);
app.get("/getByfield", [], getById);
app.put("/", [], updateUser);
app.delete("/", [], deleteUser);

module.exports = app;
