import React, { useState, useEffect } from 'react'
import services from './services';
import Notification from './Notification';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notifStatus, setNotifStatus] = useState('')

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
        const newPerson = {name: newName, number: newNumber}
        if (persons.some((person) => person.name === newName)) {
            if(window.confirm(`${newName} is already in the phone book. Do you want to update the number?`)) {
                const newPerson = persons.find(person => person.name === newName);
                newPerson.number = newNumber;
                services
                    .update(newPerson)
                    .then(changedPerson => {
                        setPersons(persons.map(person => (person.id === changedPerson.id) ? changedPerson : person ))
                    })
                    .catch((error) => {
                        console.log(error)
                        setNotif(`${newPerson.name} has already been deleted from the phonebook`, 'error')
                    })
            }
        } else if (persons.some((person) => person.number === newNumber)) {
            alert(`${newNumber} is already in the phone book`)
        } else {
            services
                .add(newPerson)
                .then(person => {
                    setPersons(persons.concat(person))
                    setNewName('')
                    setNewNumber('')
                    setNotif(`Added ${person.name}`, 'ok')
                })
        }
    }

    const setNotif = (message, status) => {
        setNotificationMessage(message)
        setNotifStatus(status)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    useEffect(() => {
        services
            .getAll()
            .then(persons => {
                setPersons(persons)
            })
    }, [])

    const onDelete = (person) => {
        if(window.confirm(`Do you want to delete ${person.name}`)) {
            services
                .remove(person.id)
                .then(response => {
                    setPersons(persons.filter(p => person.id !== p.id))
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} status={notifStatus}/>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>Add a new</h3>
            <Form handleSubmit={handleSubmit} handleChange={handleChange}
                newName={newName} newNumber={newNumber}
                handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} onDelete={onDelete}/>
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

const Persons = ({ persons, filter, onDelete }) => {
    const personsToShow = persons.filter(person => {
        const name = String(person.name)
        return name.toLowerCase().indexOf(filter) !== -1;
    })
    return (
        <div>
            {personsToShow.map(person => 
                <div key={`${person.id}`}>
                    <p key={`label${person.id}`}>{person.name} {person.number}</p>
                    <button key={`button${person.id}`} onClick={() => onDelete(person)}>Delete</button>
                </div>
            )}
        </div>
    )
}
export default App