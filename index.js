// const http = require('http')
const { request, response } = require("express");
const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "Tengo que empezar a crear contenido",
    date: "2019-05-30T17:30:31.0982",
    important: true,
  },
  {
    id: 2,
    content: "Para salir de la situación en la cual me encuentro",
    date: "2019-05-30T18:39:34.0912",
    important: false,
  },
  {
    id: 3,
    content: "Lo hare por mi , mi mujer y mi goldita bella",
    date: "2019-05-30T19:20:25.2982",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })

app.get("/", (request, response) => {
  response.send("<h1>Hola nuevo mundo</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
