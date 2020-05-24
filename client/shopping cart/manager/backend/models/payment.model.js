const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payment = new Schema({
    person_name : {type : String, required: true},

    address : {type : String, required: true},
    con_num : {type : Number, required: true},
    city : {type : String, required: true}
})

module.exports = mongoose.model('payment', payment);
