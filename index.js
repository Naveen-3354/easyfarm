const express = require("express")
const cookieParser = require('cookie-parser')


require("dotenv").config()
require("./database/mongoose")

/* Importing Routes */
const authentication = require("./routes/authRoutes")
const products = require("./routes/porductsRoutes")
const users = require("./routes/userRoutes")

const requestValidation = require("./middleware/requestValidation")

/* Creating variables */
const port  = process.env.PORT_ONE || process.env.PORT_TWO;
const cookieSerect= process.env.COOKIE_SECRET_KEY

const server = express();

/* Middlewares */
server.use(express.json())
server.use(cookieParser(cookieSerect))


/* Starting Api route paths */
server.use("/auth", authentication)
server.use("/products", requestValidation, products)
server.use("/users",requestValidation, users)

server.listen(port, ()=>console.log("Listening on port "+port))