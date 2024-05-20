const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const uuid = require('uuid');

const PORT = 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/api/notes', (req,res) => {
    res.json(notes)
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text,
        status: "active"
    }

    if(!newNote.title || !newNote.text) {
        res.status(400).json({ msg: 'Please enter a title and text'})
    }

    notes.push(newNote);
    res.json(notes)
});

app.use(express.static(path.join(__dirname, 'public')));

// A route for notes html
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));




