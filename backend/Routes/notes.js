const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//ROUTE1: GET ALL THE NOTES OF LOGGED IN USER
router.get("/getnotes", fetchuser,
    async (req, res) => {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);


    });

// ROUTE 2: ADD A NEW NOTE USING POST -- /api/notes/addnotes
router.post("/addnotes", fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 character').isLength({ min: 5 })
],

    async (req, res) => {

        // if there is any error return that error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const note = new Note({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,
                user: req.user.id

            })
            const savednotes = await note.save();

            res.json(savednotes);

        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("some error occured")
        }
        ;


    });
// ROUTE 3(put request for update): UPDATE A NOTE api/auth/updatenote:id , id is given such that each note has a unique id and 
//we have to update that particular id note.
router.put("/updatenote/:id", fetchuser,
    async (req, res) => {
        try {
            const newnote = {};
            if (req.body.title) {
                newnote.title = req.body.title;
            }
            if (req.body.description) {
                newnote.description = req.body.description;
            }
            if (req.body.tag) {
                newnote.tag = req.body.tag;
            }
            // whether note of that id is in database or not
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(400).send("Not found")
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed");
            }
            // to update that note , means newnote is now set to that id
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
            res.json(note);
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("some error occured")
        }

    }
);

// router 4-- to delete any note /api/note/deletenote:id // which note to delete
router.delete("/deletenote/:id", fetchuser,
    async (req, res) => {
        try {
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(400).send("no note available");
            }
            // check if user id matches 
            // note.user.tostring() -- to return that id of user
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed");
            }
            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ success: "note has been deleted" });
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("some error occured")
        }


    });

module.exports = router;