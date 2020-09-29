const notesData = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
uuidv4();

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    })

    app.post("/api/notes", function (req, res) {
        let tempObj = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        };
        notes.push(tempObj);
        console.log(notes);
        res.json(notes);
    });

};