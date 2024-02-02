const express = require("express");
const { registerUser, userLogin } = require("../service/authService");
const app = express.Router();

app.post("/register", registerUser);
app.post("/login", userLogin);

module.exports = app;