const mongoose = require("mongoose");

async function connectDB(url){
    return mongoose.connect(url)
    .then( () => {
        console.log("Database Connected")
    })
    .catch( (err) => {
        console.log("Error while connecting to Database" , err)
    })
}

module.exports = {
    connectDB,
}