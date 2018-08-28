const mongoose = require('mongoose')

var productsSchema = new mongoose.Schema({
    name: String,
    category: String
})

module.exports = mongoose.model('Products', productsSchema)
