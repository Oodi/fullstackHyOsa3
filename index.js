const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./Mongo')


app.use(cors())


app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))


let persons = [
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "123",
        "id": 3,
        "number": "1"
      },
      {
        "name": "1231241",
        "number": "324143",
        "id": 4
      }
]

app.get('/info', (req, res) => {
  res.send('<p>puhelinluettelossa on ' + persons.length + ' henkilön tiedot</p>'
      + '<p>' + Date() + '</p>' )
})

app.get('/api/persons', (req, res) => {
  Person
  .find({})
  .then(persons => {
    res.json(persons.map(formatNote))
  })
})

const formatNote = (note) => {
  return {
    name: note.name,
    number: note.number,
    id: note._id
  }
}


app.get('/api/persons/:id', (req, res) => {
  Person
  .findById(req.params.id)
  .then(note => {
    response.json(formatNote(note))
  })
})

const generateId = () => {
  const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const personn = new Person ( {
    name: body.name,
    number: body.number
  })

  personn
  .save()
  .then(savedNote => {
    res.json(formatNote(savedNote))
  })
})

app.delete('/api/persons/:id', (req, res) => {
  Person
  .findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => {
    res.status(400).send({ error: 'malformatted id' })
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
