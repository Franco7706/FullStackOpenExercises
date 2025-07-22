import { useState , useEffect} from 'react'
import countryService from './services/countries'

import Search from './components/Search'
import Show from './components/Show'

function App() {
  const [countries,setCountries] = useState([])
  
  const [newFilter,setFilter] = useState('')

  useEffect(()=>{
    countryService
    .getAll()
    .then(countriesService=>{
      setCountries(countriesService)
    })
  },[])

  const handleFilter=(event)=>{
    setFilter(event.target.value)
  }
  const handleSelect=(name)=>{
    setFilter(name)
  }

  const filteredCountries=newFilter.length===0?countries:countries.filter(country=>country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Search filter={newFilter} handleChange={handleFilter}/>
      <Show countries={filteredCountries} handleSelect={handleSelect}/> 
    </div>
  )
}

export default App
