const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()

}

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin! Tset
const url = process.env.MONGODB_URI

mongoose.connect(url)

const Person = mongoose.model('Note', {
  name: String,
  number: String,
  id: Number
})

module.exports = Person
