const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to mongodb')
    })
    .catch(err => {
        console.log('Error connectign to mongodb: ', err)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
    id: String
})

personSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)