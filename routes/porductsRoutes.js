const express = require("express");
const app  = express.Router()

const {user, admin,developer}=require("../service/productService")
const { roleDev, roleUser,roleAdmin } = require("../middleware/roleAuthorization");

app.get('/user',[roleUser],user)
app.get('/admin',roleAdmin,admin)
app.get('/dev',[roleDev],developer)

module.exports = app