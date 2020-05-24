const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title : {type : String, required: true},
    productName: {type: String, required: true},
    description: {type: String, required: true},
    color: {type: String, required: true},
    size: {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, required: true},
    productImage: {type: String, required: true},
},{
    timestamp: true,
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;