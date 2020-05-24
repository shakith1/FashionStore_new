const mongoose = require('mongoose');
const productSchema = mongoose.Schema;

let Product = new productSchema({
    image_path : {
        type : String
    },
    product_name : {
        type : String
    },
    product_price : {
        type : Number
    }

},{
    collection: 'product'
});

module.exports = mongoose.model('Product', Product);
