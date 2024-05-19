const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// A route for notes html
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));




