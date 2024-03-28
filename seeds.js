const mongoose = require('mongoose');
const Product = require('./models/product')
mongoose.connect('mongodb://127.0.0.1:27017/Shop')
.then(()=>console.log('MONGOOSE CONNECTION SUCCESSUL'))
.catch(err => {
    console.log('MONGOOSE CONNECTION FAILED')
    console.log(err)
})
const p = new Product({name : 'apple' , identification : 20 , category : 'fruit'})
p.save()
.then(()=>console.log('IT WORKED'))
.catch(err=> {
    console.log('IT FAILED')
    console.log(err)
})