const mongoose = require("mongoose");
const MONGOURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
// inotebook is the database name
const ConnectToMongo = () => {
    mongoose.connect(MONGOURI, () => {
        console.log("connected to mongo successfully");
    })
}

module.exports = ConnectToMongo;