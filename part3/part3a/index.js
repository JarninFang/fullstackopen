const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const Note = require('./models/note')
//const url = `mongodb+srv://fullstack:fullstack@fullstack-l7wpv.mongodb.net/note-app?retryWrites=true&w=majority`

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findById(id).then(note => {
        if (note) {
            res.send(note.toJSON())
        } else {
            res.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/notes/:id', (req, res, next) => {
    const id = Number(req.params.id)
    Note.findByIdAndDelete(id).then(note => {
        res.status(204).end()
    }).catch(err => next(err))
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0

    return maxId + 1
}

app.post('/notes', (req, res) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    })
    note.save().then(savedNote => {
        res.json(savedNote.toJSON())
    })
})

app.put('/notes/:id', (req, res, next) => {
    const body = req.body
    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote.toJSON())
        }).catch(err => next(err))
})

const unknownRoutes = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownRoutes)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
