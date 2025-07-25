import { useState, useEffect } from 'react'

import personService from './services/persons'

import People from './components/People'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message,setMessage] = useState({text:null,error:null})

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

        setMessage({text:`Changed ${returnedPerson.name}'s number to ${returnedPerson.number}`,error:false})
        setTimeout(()=>{setMessage({text:null,error:null})},5000)
      })
      .catch(error=>{
        if(error.response.status===404){
          setMessage({text:`Information of ${changedPerson.name} has already been removed from the server`,error:true})
          setTimeout(()=>{setMessage({text:null,error:null})},5000)
          setPersons(persons.filter(person=>person.id!==changedPerson.id))
          
          setNewName('')
          setNewNumber('')
        }
        else{
          setMessage({text:error.response.data.error,error:true})
          setTimeout(()=>{setMessage({text:null,error:null})},5000)
        }
      })
    }
    else{
      const person={
        name: newName,
        number: newNumber
      }
      personService
      .addPerson(person)
      .then(data=>{
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        
        setMessage({text:`Added ${data.name}`,error:false})
        setTimeout(()=>{setMessage({text:null,error:null})},5000)
      })
      .catch(error=>{
        setMessage({text:error.response.data.error,error:true})
        setTimeout(()=>{setMessage({text:null,error:null})},5000)
      })
    }
  }

  const peopleToShow=newFilter.length===0?persons:persons.filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange=(event)=>{
    setNewFilter(event.target.value)
  }

  const handleDeletePerson=(id)=>{
    if(!confirm(`delete ${persons.find(person=>person.id===id).name}?`)) return
    personService.deletePerson(id)
    .then(data=>{
      setPersons(persons.filter(person=>person.id!==data.id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <AddPerson name={newName} number={newNumber} changeName={handleNameChange} changeNumber={handleNumberChange} addPerson={handleAddName}/>
      <h3>Numbers</h3>
      <People people={peopleToShow} handleDelete={handleDeletePerson}/>
    </div>
  )
}

export default App