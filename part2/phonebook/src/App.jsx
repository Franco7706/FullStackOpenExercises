import { useState, useEffect } from 'react'
import axios from 'axios'

import People from './components/People'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      console.log('promise fullfilled')
      setPersons(response.data)
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
    let valid=true
    persons.forEach((person)=>{
      if(person.name===newName){
        alert(`${newName} is already added to phonebook`)
        valid=false
      }
    })
    setNewName('')
    setNewNumber('')
    if(!valid) return
    const person={
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
  }

  const peopleToShow=newFilter.length===0?persons:persons.filter(person=>person.name.toLowerCase().includes(newFilter))

  const handleFilterChange=(event)=>{
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <AddPerson name={newName} number={newNumber} changeName={handleNameChange} changeNumber={handleNumberChange} addPerson={handleAddName}/>
      <h3>Numbers</h3>
      <People people={peopleToShow}/>
    </div>
  )
}

export default App