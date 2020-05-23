const router = require('express').Router();
let Product = require('../models/product.model');
const multer = require('multer');
//const upload = multer({dest: './../src/images/'});
const replaceall = require('replaceall');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../src/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    //file excepted
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        //reject the file and only won't store the file other details get stored if sends a err msg then it will throw an error then this will not store any msg
        cb(new Error('Only jpeg, jpg and png images are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/add').post(upload.single('productImage'),(req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const productName = req.body.productName;
    const description = req.body.description;
    const color = req.body.color;
    const size = req.body.size;
    const price = Number(req.body.price);
    const discount = Number(req.body.discount);
    //const productImage = replaceall("\\","/", req.file.path);
    const productImage = req.file.filename;

    const newProduct = new Product({
        title,
        productName,
        description,
        color,
        size,
        price,
        discount,
        productImage,
    });

    newProduct.save()
        .then(() => res.json('Product Added!'))
        .catch(err => res.status(400).json('Error : ' + err));

});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product Deleted!'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post(upload.single('productImage'),(req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.productName = req.body.productName;
            product.description = req.body.description;
            product.color = req.body.color;
            product.size = req.body.size;
            product.price = Number(req.body.price);
            product.discount = Number(req.body.discount);
            product.productImage = req.file.filename;

            product.save()
                .then(() => res.json('Product Updated!'))
                .catch(err => res.status(400).json('Error : ' +err));
        })
        .catch(err => res.status(400).json('Error : ' +err));
});


module.exports = router;