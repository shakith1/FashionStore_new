const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema;

let Review = new reviewSchema({

    image : {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    user: {
        type: String
    },
    comments: {
        type: String
    },
    rating: {
        type: Number
    }

},{
    collection: 'review'
});

module.exports = mongoose.model('Review', Review);
