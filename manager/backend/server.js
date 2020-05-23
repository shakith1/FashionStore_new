const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('./../src/images/'));

const uri = 'mongodb://localhost:27017/fashionStore';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establish successfully");
})

const ProductsRouter = require('./routes/products');
const Category = require('./routes/category');

app.use('/products', ProductsRouter);
app.use('/category', Category);


app.listen(port, () => {
    console.log(`Server is running on Port : ${port}`);
})