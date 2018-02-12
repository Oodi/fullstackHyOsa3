const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())


app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

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
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person =  persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
}
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

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons =  persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
