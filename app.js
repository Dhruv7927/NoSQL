require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');

const methodOverride = require('method-override');

const mongoose = require('mongoose');

const Product = require('./models/product');

const categories = ['fruit' , 'vegetable' , 'diary' ];

mongoose.connect(process.env.MONGO_URL)
// mongoose.connect('mongodb://127.0.0.1:27017/Shop')
.then(()=>console.log('MONGOOSE CONNECTION SUCCESSUL'))
.catch(err => {
    console.log('MONGOOSE CONNECTION FAILED');
    console.log(err);
});

app.set('views' , path.join(__dirname , "views"));
app.set('view engine' , 'ejs');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended : true}));

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});

app.get('/product' , async (req , res)=>{
    const {category} = req.query
    if (category){
        const products = await Product.find({category});
        res.render('products/index' , {products , category });
    }
    else{
        const products = await Product.find()
        res.render('products/index' , {products , category : "All"});
    }
   
})
app.get('/product/new', (req,res)=>{
    res.render('products/new',{categories});
})

app.post('/product/new' , async (req , res)=>{
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`/product/${newProduct.id}`)
});

app.get('/product/:id/edit',async (req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product , categories})
});

app.put('/product/:id' , async (req,res)=>{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id , req.body , {new : true})
    res.redirect(`/product/${product._id}`)
});

app.delete('/product/:id' ,async (req,res)=>{
    const {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/product')
});

app.get('/product/:id' , async (req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    console.log(product)
    res.render('products/show' , {product})
});