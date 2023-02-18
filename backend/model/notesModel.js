
const mongoose = require("mongoose");


const notesNotes = mongoose.Schema({
    title: {type:String,require:true},
    body: { type: String, require: true },
    user:String
});


const notesModel = mongoose.model("note", notesNotes);


module.exports = notesModel;