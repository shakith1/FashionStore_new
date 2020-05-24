const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

let Fashion = new newSchema({

    imagePath: {
        type: String
    },
    dressName: {
        type: String
    },
    dressPrice: {
        type: Number
    }


},{
    collection: 'fashion'
});

module.exports = mongoose.model('Fashion', Fashion);
