const http = require('http')

let notes = [
    {
        id: 1,
        "content": "Tengo que empezar a crear contenido",
        "date": "2019-05-30T17:30:31.0982",
        "important": true
    },
    {
        id: 2,
        "content": "Para salir de la situación en la cual me encuentro",
        "date": "2019-05-30T18:39:34.0912",
        "important": false
    },
    {
        id: 3,
        "content": "Lo hare por mi mujer y mi goldita bella",
        "date": "2019-05-30T19:20:25.2982",
        "important": true
    },
]

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})

const PORT = 3005
app.listen(PORT)
console.log(`Server running on port ${PORT}`)