var notesData = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
uuidv4();

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    })

    app.post("/api/notes", function (req, res) {
        const newId = uuidv4();
        req.body.id = newId;
        notesData.push(req.body);
        res.send(notesData);

        fs.writeFile(
            "./Develop/db/db.json",
            JSON.stringify(notesData),
            "utf8",
            (err) => {
              if (err) throw err;
              res.json(notesData);
            }
          );
    });

    app.delete("/api/notes/:id", function(req, res) {
        notesData = notesData.filter(note=> {
            if (note.id == req.params.id) {
                return false;
            }
            return true;
        });
        res.send(notesData);
    })

};