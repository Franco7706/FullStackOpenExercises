const express = require('express')
const app = express()
const morgan = require('morgan')


const cors = require('cors')

app.use(cors())

morgan.token('content', (req,res)=>{
  if(req.body)
    return JSON.stringify(req.body)
  else return ''
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.content(req,res)
  ].join(' ')
}))

let persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
const time=new Date()
app.get('/info',(request,response)=>{
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${time}</p>`)
})

app.get('/api/persons/:id', (request,response)=>{
  const person = persons.find(person=>person.id===request.params.id)

  if(person){
    response.json(person)
  }
  else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request,response)=>{
  const person = persons.find(person=>person.id===request.params.id)
  if(person){
    persons=persons.filter((person)=> person.id!==request.params.id)
    response.json(person)
  }
  else
    response.status(204).end()
})

const generateId = () =>{
  let id=String(5+Math.floor(Math.random()*10000))
  return id
}
app.post('/api/persons', (request,response)=>{
  const body=request.body
  
  if(!body.name){
    return response.status(400).json({
      error: 'name missing',
    })
  }

  if(!body.number){
    return response.status(400).json({
      error: 'number missing',
    })
  }
  if(persons.find(person=>{
    return person.name===body.name}
  )){
    
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons=persons.concat(person)
  response.json(person)
})

const PORT=3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})