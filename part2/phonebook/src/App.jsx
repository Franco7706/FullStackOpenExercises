import { useState, useEffect } from 'react'

import personService from './services/persons'

import People from './components/People'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    personService
    .getAll()
    .then(data=>{
      setPersons(data)
    })
  },[])


  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }
  const handleAddName=(event)=>{
    event.preventDefault()
    let isNewPerson=true
    persons.forEach((person)=>{
      if(person.name===newName){
        isNewPerson=false
      }
    })
    if(!isNewPerson){
      if(!confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) return
      const person=persons.find(currentPerson=>currentPerson.name===newName)
      const changedPerson={
        ...person,
        number: newNumber
      }
      personService
      .updatePerson(changedPerson.id,changedPerson)
      .then(returnedPerson=>{
        setPersons(persons.map(currentPerson=>currentPerson.id===returnedPerson.id?returnedPerson:currentPerson))
        setNewName('')
        setNewNumber('')
      })
    }
    else{
      const person={
        name: newName,
        number: newNumber,
        id: persons.reduce((accumulator,currentValue)=>Math.max(accumulator,currentValue.id),0)+1
      }
      personService
      .addPerson(person)
      .then(data=>{
            setPersons(persons.concat(data))
            setNewName('')
            setNewNumber('')
      })
    }
  }

  const peopleToShow=newFilter.length===0?persons:persons.filter(person=>person.name.toLowerCase().includes(newFilter))

  const handleFilterChange=(event)=>{
    setNewFilter(event.target.value)
  }

  const handleDeletePerson=(id)=>{
    if(!confirm(`delete ${persons.find(person=>person.id===id).name}?`)) return
    personService.deletePerson(id).
    then(data=>{
      setPersons(persons.filter(person=>person.id!==data.id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <AddPerson name={newName} number={newNumber} changeName={handleNameChange} changeNumber={handleNumberChange} addPerson={handleAddName}/>
      <h3>Numbers</h3>
      <People people={peopleToShow} handleDelete={handleDeletePerson}/>
    </div>
  )
}

export default App