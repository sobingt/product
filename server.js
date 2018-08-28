const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/shop')
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.on('open', () => console.log("success in connecting to mongodb"))
 
var productsSchema = new mongoose.Schema({
	name: String,
	category: String
})

var Products = mongoose.model('Products', productsSchema)

var productsArray=[
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

app.get('/',(request,response)=>{
	response.send('Product details')
})

app.get('/api/products',(request,response)=>{
	response.json(products)
})

app.get('/api/products/:id',(request,response)=>{
  let prod
  products.forEach(product =>{
  	if(product.id == request.params.id)
  	{
       prod = product
  	}
  });
  response.json(prod)
})

/*app.post('/api/products',(request,response)=>{
	console.log(request.body)
	products.push({

		id: request.body.id,
		name: request.body.name,
		category: request.body.category	
	})
	response.json(products)
})

app.put('/api/products/:id',(request,response)=>{
  let prod
  products.forEach(product =>{
  	if(product.id == request.params.id)
  	{
  		product.name= request.body.name,
  		product.category= request.body.category,
  		product.id= request.body.id
  	}
  });
  response.json(products)
})

app.del('/api/products/:id',(request,response)=>{
	let prod;
	products.forEach((product,index) =>{
		if(product.id == request.params.id)
		{
			products.splice(index,1)
		}
	});
	response.json(products)
})*/

app.post('/api/product',(request,response)=>{ 
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
app.listen(4040,()=> console.log('Express server at 4040'))