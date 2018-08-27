const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
var products=[
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

app.listen(4040,()=> console.log('Express server at 4040'))