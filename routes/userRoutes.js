const express = require("express");
const app = express.Router();

const {getAllUser, getByFields, getById, updateUser} = require("../service/userService")


app.get("/",getAllUser)
app.get("/getByFields",getByFields)
app.get("/getByfield",getById)
app.put("/",updateUser)

module.exports = app;