const Products = require('../models/Product')
const {productsArray} = require('../utils/const') 

exports.index = (request, response) => {
    response.send('Product details')
}

exports.bulkUpload = (request, response) => {
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
}

exports.getAllProducts = (request, response) => {
    exports.query = Products.find();
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
}

exports.getProductById = (request, response) => {
    Products.findById(request.params.id, (error, products) => {
        if (error)
            response.json({
                error: error,
                status: 500
            })
        response.json(products)
    })
}

exports.postCreateProduct = (request, response) => {
    console.log(request.body)
    const product = new Products({
        name: request.body.name,
        category: request.body.category
    })
    product.save().then((product) => {
        console.log('Added successfully')
        response.json(product)
    })
}

exports.putUpdateById = (request, response) => {
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
} 

exports.delRemoveProductById =  (request, response) => {
    Products.findOneAndDelete({ _id: request.params.id }, (error, deleteId) => {
        if (error)
            response.json({
                error: error,
                status: 500
            })
        response.json({ message: "deleted successfully" })
    })

}