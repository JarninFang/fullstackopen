import React, { useState, useEffect } from 'react'
import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already in the phonebook`)
        } else if (persons.some((person) => person.number === newNumber)) {
            alert(`${newNumber} is already in the phone book`)
        } else {
            setPersons(persons.concat({ name: newName, number: newNumber }))
            setNewName('')
            setNewNumber('')
        }
    }

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then((response) => {
                console.log(response);
                setPersons(response.data);
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>Add a new</h3>
            <Form handleSubmit={handleSubmit} handleChange={handleChange}
                newName={newName} newNumber={newNumber}
                handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter}/>
        </div>
    )
}

const Filter = ({ filter, handleFilterChange }) => (
    <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
)

const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                name: <input value={props.newName} onChange={props.handleChange} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons, filter }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().indexOf(filter) !== -1);
    return (
        <div>
            {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}
export default App