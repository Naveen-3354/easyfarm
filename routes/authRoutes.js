const express = require("express");
const app = express.Router();
const { registerUser, userLogin } = require("../service/authService");

app.post("/register", registerUser);
app.post("/login", userLogin);

module.exports = app;