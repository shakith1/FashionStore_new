const express = require('express');
const productRoutes = express.Router();
let mongoose = require('mongoose');
let Product = require('./products.model');

//Add
productRoutes.route('/add').post(function(req,res){
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'product': 'product is added successful'});
        })
        .catch(err => {
            res.status(400).send("unable to save database");
        });
});

//GET data
productRoutes.route('/').get(function (req, res) {
    Product.find(function (err, product) {
        if(err)
            console.log(err);
        else{
            res.json(product);
        }
    });

});

// GET single data
productRoutes.route('/edit/:id').get((req, res, next) => {
    Product.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Update data
productRoutes.route('/update/:id').put((req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Updated successfully !')
        }
    })
});

// Delete data
productRoutes.route('/delete/:id').delete((req, res, next) => {
    Product.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = productRoutes;
