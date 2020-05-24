const express = require('express');
const fashionRoutes = express.Router();
let mongoose = require('mongoose');

let Fashion = require('./fashion.model');

//Add
fashionRoutes.route('/add').post(function(req,res){
    let fashion = new Fashion(req.body);
    fashion.save()
        .then(fashion => {
            res.status(200).json({'fashion': 'fashion is added successful to Fashion database'});
        })
        .catch(err => {
            res.status(400).send("unable to save database to fashion database");
        });
});

//GET data
fashionRoutes.route('/').get(function (req, res) {
    Fashion.find(function (err, fashion) {
        if(err)
            console.log(err);
        else{
            res.json(fashion);
        }
    });

});

// GET single data
fashionRoutes.route('/edit/:id').get((req, res, next) => {
    Fashion.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//Update data
fashionRoutes.route('/update/:id').put((req, res, next) => {
    Fashion.findByIdAndUpdate(req.params.id, {
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
fashionRoutes.route('/delete/:id').delete((req, res, next) => {
    Fashion.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = fashionRoutes;




















