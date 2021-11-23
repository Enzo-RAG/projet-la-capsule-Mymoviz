var mongoose = require('mongoose')

var movieSchema = mongoose.Schema({
    movieName: String,
    movieImg: String
})

var movieModel = mongoose.model('wishes', movieSchema)

module.exports = movieModel;