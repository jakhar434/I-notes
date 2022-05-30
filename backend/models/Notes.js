const mongoose = require("mongoose");

const Notesschema = new mongoose.Schema({
    // such that one user cant see another useer notes
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title: {
        type: String,
        required:true,
    },
    description :{
        type:String,
        required: true,
       
    },
    tag :{
        type:String,
        default :"general",
    
    },
    date:{
        type:Date,
        default : Date.now,
    }
    

});
module.exports = mongoose.model("note", Notesschema);