const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@easyfarm.mfq2uws.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>console.log("Database connected suuccessfully..."))
.catch((err)=>console.log("Error in connecting to databse..."+ err
))

module.exports = mongoose.connection