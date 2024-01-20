const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true 
    },
    identification : {
        type : Number , 
        required : true ,
        min : 0 
    },
    category : {
        type : String , 
        enum : ['Faculty' , 'Student' , 'Admin']
    }
})
const Product = mongoose.model('Product' , productSchema)

module.exports = Product ;
