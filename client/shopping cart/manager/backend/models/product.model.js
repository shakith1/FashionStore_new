const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;