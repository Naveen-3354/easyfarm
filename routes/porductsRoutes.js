const express = require("express");
const app  = express.Router()

const {userRole} = require("../middleware/roleAuthorization")
const {user, admin, developer} = require("../service/productService")

app.get('/user',[userRole],user)
app.get('/admin',admin)
app.get('/dev',developer)

module.exports = app