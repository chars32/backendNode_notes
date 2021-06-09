const express = require('express')
const app = express()
const logger = require('./middlewares/logger')

app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Tengo que empezar a crear contenido',
    date: '2019-05-30T17:30:31.0982',
    important: true
  },
  {
    id: 2,
    content: 'Para salir de la situación en la cual me encuentro',
    date: '2019-05-30T18:39:34.0912',
    important: false
  },
  {
    id: 3,
    content: 'Lo hare por mi , mi mujer y mi goldita bella',
    date: '2019-05-30T19:20:25.2982',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hola nuevo mundo</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  console.log(note)

  if (!note || !note.content) {
    return response.status(404).json({
      error: 'note content is mising'
    })
  }

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]
  response.json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
