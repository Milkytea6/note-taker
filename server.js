const express = require('express');
const { readFile, writeFile } = require('fs').promises;
const path = require('path');
// notes changed to let variable
let notes = require('./db/db.json');
const uuid = require('uuid');

const PORT = 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Gets the notes from the backend db
app.get('/api/notes', async (req,res) => {
    const db = await readFile('./db/db.json', "utf8" )
    res.send(db)
});

//  Allows the new note to push into the backend db
app.post('/api/notes', async (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text,
    }

    if(!newNote.title || !newNote.text) {
        res.status(400).json({ msg: 'Please enter a title and text'})
    }

    const db = await readFile('./db/db.json', "utf-8")
    const parseDb = JSON.parse(db);

    parseDb.push(newNote);
    await writeFile('./db/db.json', JSON.stringify(parseDb))
    res.json(parseDb);
});
// deletes the notes on the backend db
app.delete('/api/notes/:id', async (req, res) => {
    // get the id of selected note
    const noteId =  req.params.id;
    const db = await readFile('./db/db.json', 'utf-8');
    let parseDb = JSON.parse(db);
    // Filters out the selected note from the db
    parseDb = parseDb.filter(note => note.id !== noteId)
    await writeFile('./db/db.json', JSON.stringify(parseDb));
    // Returns the array without the deleted note
    res.json( {msg: 'note deleted', parseDb})
  
})

app.use(express.static(path.join(__dirname, 'public')));

// A route for notes html
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));




