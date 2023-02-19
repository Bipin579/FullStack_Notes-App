const mongoose = require("mongoose");

const notesNotes = mongoose.Schema(
  {
    title: { type: String, require: true },
    body: { type: String, require: true },
    user: String,
    createdAt: String,
  },
  {}
);

notesNotes.pre("save", function () {
  if (this.isNew) {
    const utcDate = new Date();
    const indianDate = utcDate.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    this.createdAt = indianDate;
  }
});

const notesModel = mongoose.model("note", notesNotes);

module.exports = notesModel;
