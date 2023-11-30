import React, { useState, useEffect } from 'react'
import personService from './services/notes'
import './index.css'

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      Filter shown names: <input value={searchTerm} onChange={handleSearch} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, searchTerm, handleDelete }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((person, index) => (
          <li key={index}>
            {person.name} - {person.number}{' '}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error loading data:', error)
      })
  }, [])

  const addPerson = async (event) => {
    event.preventDefault()

    let existingPerson = persons.find((person) => person.name === newName)
    let updatedPerson

    try {
      if (existingPerson) {
        const confirmUpdate = window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)
        if (confirmUpdate) {
          updatedPerson = await personService.update(existingPerson.id, { ...existingPerson, number: newNumber })
          setPersons(persons.map(person => (person.id !== existingPerson.id ? person : updatedPerson)))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Person '${updatedPerson.name}' updated successfully!`)
          setTimeout(() => setSuccessMessage(null), 5000)
        }
      } else {
        const newPerson = await personService.create({ name: newName, number: newNumber })
        setPersons([...persons, newPerson])
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Person '${newPerson.name}' added successfully!`)
        setTimeout(() => setSuccessMessage(null), 5000)
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Error updating person:', error.message)
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Information of '${updatedPerson ? updatedPerson.name : newName}' has already been removed from the server`)
        setTimeout(() => setErrorMessage(null), 5000)
      } else {
        console.error('Error:', error)
      }
    }
  }

  const handleDelete = async (id) => {
    const personToDelete = persons.find((person) => person.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      try {
        await personService.remove(id)
        setPersons(persons.filter((person) => person.id !== id))
        setSuccessMessage(`Person '${personToDelete.name}' deleted successfully!`)
        setTimeout(() => setSuccessMessage(null), 5000)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {errorMessage && (
        <div className={errorMessage.includes('updated') ? 'updated' : errorMessage.includes('deleted') ? 'deleted' : 'error'}>
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className={successMessage.includes('updated') ? 'updated' : successMessage.includes('deleted') ? 'deleted' : 'success'}>
          {successMessage}
        </div>
      )}

      <Filter searchTerm={searchTerm} handleSearch={(e) => setSearchTerm(e.target.value)} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} searchTerm={searchTerm} handleDelete={handleDelete} />
    </div>
  )
}

export default App;
