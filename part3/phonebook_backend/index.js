const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
//const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

const PORT = process.env.PORT

const Person = require('./models/person')

//const loggerFormat = ':method :url :status - :response-time ms :res[body]'
//app.use(morgan(loggerFormat))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result.map(person => person.toJSON()))
    }).catch(err => {
        console.log('Error sending GET to /api/persons ', err)
        res.status(400).send()
    })
})

/*app.get('/info', (req, res) => {
    const date = new Date()
    res.write('Phonebook has info for ' + persons.length + ' people\n\n')
    res.write(date.toString())
    res.end()
})*/

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id).then(result => {
        res.json(result.toJSON())
    }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(result => {
        res.status(204).end()
    }).catch(err => next(err))
})

const generateId = () => {
    return Math.ceil(Math.random() * 10000)
}
app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: "You need to send both the name and number."
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
        date: new Date(),
        id: generateId()
    })

    console.log(newPerson)
    newPerson.save().then(result => {
        res.json(result.toJSON())
    }).catch(err => {
        console.log('Error saving to database ', err)
        res.status(400).send()
    })
})
app.put('/api/persons/:id', (req, res) => {
    const body = req.body;

    const updatedPerson = new Person({
        name: body.name,
        number: body.number,
        date: new Date(),
        id: req.params.id
    })
    updatedPerson.replaceOne({id: updatedPerson.id}).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(`Error updating person with id ${id} `, err)
        res.status(400).send()
    })
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if(error.name === "CastError" && error.kind === 'ObjectID') {
        return res.status(404).send({error: "malformatted id"})
    }

    next(error)
}

app.use(errorHandler)

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint"})
}

app.listen(PORT, () => {
    console.log('Server listening on port ', PORT)
})