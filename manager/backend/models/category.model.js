const mongoose = require('mongoose');

const cateogrySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'n/a'
    }
})

const Category = mongoose.model('Category', cateogrySchema)

module.exports = Category;