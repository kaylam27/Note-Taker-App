var notesData = require("../db/db.json");
const { v4 : uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

module.exports = function(app) {
  
  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

  app.post("/api/notes", function(req, res) {
    const newId = uuidv4();
    
    req.body.id = newId;
    notesData.push(req.body);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesData));
    res.send(notesData);
  });

  app.delete("/api/notes/:id", function(req, res) {
    notesData = notesData.filter(note => {
      if (note.id == req.params.id) {
        return false;
      }
      return true;
    });
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesData));
    res.send(notesData);
  });
  
};