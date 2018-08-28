const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('port', process.env.PORT || 4040)

const productController = require('./controllers/products')

mongoose.connect('mongodb://localhost:27017/shop')
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.on('open', () => console.log("success in connecting to mongodb"))


app.get('/', productController.index)

app.get('/api/product/bulk-upload', productController.bulkUpload)

app.get('/api/product', productController.getAllProducts)

app.get('/api/product/:id', productController.getProductById)

app.post('/api/product', productController.postCreateProduct)

app.put('/api/product/:id', productController.putUpdateById)

app.del('/api/product/:id', productController.delRemoveProductById)

app.listen(app.get('port'), () => console.log('Express server at',app.get('port')))