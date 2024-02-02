const express = require("express")
const cookieParser = require('cookie-parser')


require("./database/mongoose")
require("dotenv").config()


const authentication = require("./routes/authRoutes")
const port  = process.env.PORT_ONE || process.env.PORT_TWO;
const cookieSerect= process.env.COOKIE_SECRET_KEY

const server = express();


server.use(express.json())
server.use(cookieParser(cookieSerect))


server.use("/auth", authentication)


server.listen(port, ()=>console.log("Listening on port "+port))