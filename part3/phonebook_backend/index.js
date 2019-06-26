const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

//const loggerFormat = ':method :url :status - :response-time ms :res[body]'
//app.use(morgan(loggerFormat))


let persons = [
    {
        "name": "asdfasdfasdf",
        "number": "123123123123321",
        "id": 1
    },
    {
        "name": "asdfasdf",
        "number": "432432342",
        "id": 2
    },
    {
        "name": "testasdf",
        "number": "212312222",
        "id": 3
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.write('Phonebook has info for ' + persons.length + ' people\n\n')
    res.write(date.toString())
    res.end()
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find((person) => id === person.id)
    if(person) {
        res.json(person)
    } else {
        res.status(400).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter((person) => id !== person.id)
    res.status(204).end()
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
    if(persons.find((person) => body.name === person.name)) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        date: new Date(),
        id: generateId()
    }

    persons = persons.concat(newPerson)
    console.log(newPerson)
    res.json(newPerson)
})
app.put('/api/persons/:id', (req, res) => {
    const body = req.body;

    const updatedPerson = {
        name: body.name,
        number: body.number,
        date: new Date(),
        id: req.params.id
    }

    persons = persons.map(person => (person.id === updatedPerson.id) ? updatedPerson: person)
    res.json(updatedPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server listening on port ', PORT)
})