const express = require('express');
const reviewRoutes = express.Router();
let mongoose = require('mongoose');
let Review = require('./review.model');

//Add data
reviewRoutes.route('/add').post(function(req,res){
    let review = new Review(req.body);
    review.save()
        .then(review => {
            res.status(200).json({'review': 'review is added successful to review database'});
        })
        .catch(err => {
            res.status(400).send("unable to save database to review database");
        });
});

//GET data
reviewRoutes.route('/').get(function (req, res) {
    Review.find(function (err, review) {
        if(err)
            console.log(err);
        else{
            res.json(review);
        }
    });

});

// Get single data
reviewRoutes.route('/n/:id').get((req, res, next) => {
    Review.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//Update data
reviewRoutes.route('/update/:id').put((req, res, next) => {
    Review.findByIdAndUpdate(req.params.id, {
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
reviewRoutes.route('/delete/:id').delete((req, res, next) => {
    Review.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = reviewRoutes;
