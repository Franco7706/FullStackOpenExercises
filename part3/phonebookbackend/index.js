require('dotenv').config()

const express = require('express')
const app = express()

const Person = require('./models/person')
const morgan = require('morgan')

app.use(express.static('dist'))
app.use(express.json())

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

app.get('/api/persons/:id', (request,response,next)=>{
  Person.findById(request.params.id)
  .then(person=>{
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error=>next(error))
})

app.delete('/api/persons/:id', (request,response,next)=>{
  Person.findByIdAndDelete(request.params.id)
  .then(person=>{
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error=>next(error))
})

app.post('/api/persons', (request,response,next)=>{
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
  .catch(error=>next(error))

})

app.put('/api/persons/:id', (request,response,next)=>{
  const {name,number} = request.body
  Person.findById(request.params.id)
  .then(
    person=>{
      if(!person){
        return response.status(404).end()
      }
      person.name=name
      person.number=number

      return person.save()
      .then(updatedPerson=>{
        response.json(updatedPerson)
      })
    }
  )
  .catch(error=>next(error))
})

const unknownEndPoint = (request,response) =>{
  response.status(404).send({'error': 'unknown endpoint'})
}
app.use(unknownEndPoint)

const errorHandler = (error,request,response,next) =>{
  console.log(error.message)

  if (error.name==='castError')
    response.status(400).send({'error': 'malformated id'})

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})