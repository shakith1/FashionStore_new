const express = require('express');
const paymentRoutes = express.Router();
let Payment = require('../models/payment.model');

paymentRoutes.route('/view').get((req, res) => {
    Payment.find()
        .then(payment => res.json(payment))
        .catch(err => res.status(400).json('Error: ' +err));
});

paymentRoutes.route('/add').post((req, res) => {
    const person_name = req.body.person_name;

    const address = req.body.address;
    const con_num = req.body.con_num;
    const city = req.body.city;

    const newPayment = new Payment({
        person_name,

        address,
        con_num,
        city
    });


    newPayment.save()
        .then(() => res.json('Payment added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

paymentRoutes.route('/view/:id').get((req, res) => {
    Payment.findById(req.params.id)
        .then(payment => res.json(payment))
        .catch(err => res.status(400).json('Error: ' + err));
});

paymentRoutes.route('/:id').delete((req, res) => {
    Payment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Payment deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

paymentRoutes.route('/update/:id').post((req, res) => {
    Payment.findById(req.params.id)
        .then(payment => {
            payment.person_name = req.body.person_name;
            payment.address = req.body.address;
            payment.con_num = req.body.con_num;
            payment.city = req.body.city;


            payment.save()
                .then(() => res.json('Payment updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});





module.exports = paymentRoutes;
