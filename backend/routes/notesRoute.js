const express = require("express");
const notesModel = require("../model/notesModel");


const notesRoute = express.Router();

notesRoute.post("/create", async (req, res) => {
    try {
        await notesModel.create(req.body);
        res.send({ message: "notes added" });
    } catch (error) {
        res.send({ error: error.message });
    }
});

notesRoute.get("/", async (req, res) => {
    try {
       const data= await notesModel.find({user:req.body.user});
        res.send({ success: true, data });
    } catch (error) {
        res.send({ error: error.message });
    }
});

notesRoute.get("/:id", async (req, res) => {
    try {
       const data= await notesModel.findById(req.params.id);
        res.send({ success: true, data });
    } catch (error) {
        res.send({ error: error.message });
    }
});

notesRoute.delete("/:id", async (req, res) => {
    try {
       const data= await notesModel.findByIdAndDelete(req.params.id);
        res.send({ success: true,deleted: data });
    } catch (error) {
        res.send({ error: error.message });
    }
});

notesRoute.patch("/:id", async (req, res) => {
    try {
       const data= await notesModel.findByIdAndUpdate(req.params.id,req.body);
        res.send({ success: true,message:"Successfully updated"});
    } catch (error) {
        res.send({ error: error.message });
    }
});




module.exports = notesRoute

