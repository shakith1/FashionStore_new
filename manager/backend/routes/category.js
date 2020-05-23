const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/api/getCategory').get((req, res) => {
    Category.find({}, (err, categories) => {
        res.status(200).send(categories)
    })
});

router.route('/api/category').post((req, res) => {
    const category = new Category(req.body)

    category.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            categoryId: doc._id
        })
    })
});

router.route('/api/category_update').post((req, res) => {
    Category.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
});

router.route('/api/delete_category').delete( (req, res) => {
    let id = req.query.id;

    Category.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
});

module.exports = router;