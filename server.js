const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/shop')
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.on('open', () => console.log("success in connecting to mongodb"))

var productsSchema = new mongoose.Schema({
    name: String,
    category: String
})

var Products = mongoose.model('Products', productsSchema)

var productsArray = [
    {
        id: 1,
        name: 'headphones',
        category: 'accessories',
    },
    {
        id: 2,
        name: 'bluetooth-headphones',
        category: 'accessories',
    },
    {
        id: 3,
        name: 'Mobiles',
        category: 'Electronics',
    },
    {
        id: 4,
        name: 'Televisions',
        category: 'Electronics',
    },
    {
        id: 5,
        name: 'Shirts',
        category: 'Clothing',
    },
    {
        id: 6,
        name: 'Laptop',
        category: 'Electronics',
    }
]

app.get('/', (request, response) => {
    response.send('Product details')
})


app.get('/api/bulk-upload', (request, response) => {
    Products.insertMany(productsArray).then(function (productarray) {
        response.json(productarray)
    }).catch(function (error) {
        if (error)
            response.json({
                error: error,
                status: 500
            })
        response.json(productarray)
    })
})

app.get('/api/product', (request, response) => {
    var query = Products.find();
    if(request.query.search)
    {
        query.where({ name : request.query.search})
    }
    query.exec((error, products) => {
        if (error)
            response.json({
                error: error,
                status: 500
            })
        response.json(products)
    })
})

app.get('/api/product/:id', (request, response) => {
    Products.findById(request.params.id, (error, products) => {
        if (error)
            response.json({
                error: error,
                status: 500
            })
        response.json(products)
    })
})

app.post('/api/product', (request, response) => {
    console.log(request.body)
    const product = new Products({
        name: request.body.name,
        category: request.body.category
    })
    product.save().then((product) => {
        console.log('Added successfully')
        response.json(product)
    })
})

app.put('/api/product/:id', (request, response) => {
    Products.updateOne({ _id: request.params.id }, { name: request.body.name, category: request.body.category }, {}, (error, products) => {
        if (error)
            response.json({
                error: error,
                status: 500
            })
        response.json(products)
    })
    /**
     * Model.findOne({ name: 'borne' }, function (err, doc) {
            if (err) ..
            doc.name = 'jason bourne';
            doc.save(callback);
        })
     */
})

app.del('/api/product/:id', (request, response) => {
    Products.findOneAndDelete({ _id: request.params.id }, (error, deleteId) => {
        if (error)
            response.json({
                error: error,
                status: 500
            })
        response.json({ message: "deleted successfully" })
    })

})
app.listen(4040, () => console.log('Express server at 4040'))