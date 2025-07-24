require('dotenv').config()

const express = require('express')
const app = express()

const Person = require('./models/person')
const morgan = require('morgan')

app.use(express.static('dist'))

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

app.use(express.json())

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/info',(request,response)=>{
  const time=new Date()
  Person.find({}).then(result => {
    response.send(`<p>Phonebook has info for ${result.length} people</p>
    <p>${time}</p>`)
  })  
})

app.get('/api/persons/:id', (request,response)=>{
  Person.findById(request.params.id)
  .then(person=>{
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error=>{
    console.log(error)
    response.status(400).send({'error': 'malformated id'})
  })
})

app.delete('/api/persons/:id', (request,response)=>{
  Person.findByIdAndDelete(request.params.id)
  .then(person=>{
    response.json(person)
  })
  .catch(error=>{
    response.status(204).end()
  })
})

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

  Person.find({name: body.name})
  .then(person=>{
    if(person.length){
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    else{
      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person.save().then(result => {
        response.json(result)
      })
    }
  })

  
  
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})