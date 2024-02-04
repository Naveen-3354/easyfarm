const express = require("express");
const app  = express.Router()

app.get('/',(request, response)=>{
    response.send("works")
})

module.exports = app