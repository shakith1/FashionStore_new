const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

const { User } = require('./models/user');
const { Category } = require('./models/category');
const { auth } = require('./middleware/auth')

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))

// GET //

app.get('/api/getCategory', (req, res) => {
    Category.find({}, (err, category) => {
        res.status(200).send(category)
    })
})

app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        res.status(200).send(users)
    })
})

app.get('/api/managers', (req, res) => {
    User.find({role:2}, (err, users) => {
        res.status(200).send(users)
    })
})

app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })
})

app.get('/api/getUser',(req,res)=>{
    let id = req.query.id;

    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})


// POST //

app.post('/api/category', (req, res) => {
    const category = new Category(req.body)

    category.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            categoryId: doc._id
        })
    })
})

app.post('/api/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false });
        res.status(200).json({
            success: true,
            user: doc
        })
    })
})

app.post('/api/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({ isAuth: false, message: 'Auth failed,email not found' })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                isAuth: false,
                message: 'Wrong Password'
            });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})

app.post('/api/sendmail',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD
        }
    });

    let mailOptions = {
        from: config.EMAIL,
        to: email,
        subject: 'Added Manager',
        text: `You have added as a manager in fashion Store.
Password : ${password}

Login Using that password to the fashion store.

Thank you.

This is a auto generated message. Do not reply.
`
    };

    transporter.sendMail(mailOptions,(err,data)=> {
        if(err){
            console.log('Error: ',err);
            res.json({
                success:false
            })
        }else{
            console.log('email sent')
            res.json({success:true})
        }
    })
})

// UPDATE //

app.post('/api/category_update', (req, res) => {
    Category.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
})

app.post('/api/user_update', (req, res) => {
    const user = new User(req.body);

    User.findByIdAndUpdate(user.id, user, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
})

// DELETE //

app.delete('/api/delete_category', (req, res) => {
    let id = req.query.id;

    Category.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

app.delete('/api/delete_user', (req, res) => {
    let id = req.query.id;

    User.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

// VAGEESHA //

const cors = require('cors');

const fashionRoutes = require('./Fashion/fashion.route');
const reviewRoutes = require('./Reviews/review.route');
const productRoutes = require('./Products/products.route');

app.use(cors());

app.use('/fashion', fashionRoutes);
app.use('/review', reviewRoutes);
app.use('/product', productRoutes);

// Dheeshana //

const router = require('express').Router();
const Product = require('./models/product.model');
const multer = require('multer');
//const upload = multer({dest: './../src/images/'});
//const upload = multer({dest: './client/src/images/'});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/src/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    //file excepted
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        //reject the file and only won't store the file other details get stored if sends a err msg then it will throw an error then this will not store any msg
        cb(new Error('Only jpeg, jpg and png images are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

app.get('/products', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error : ' + err));
});

app.post('/products/add', upload.single('productImage'),(req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const productName = req.body.productName;
    const description = req.body.description;
    const color = req.body.color;
    const size = req.body.size;
    const price = Number(req.body.price);
    const discount = Number(req.body.discount);
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

app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error : ' + err));
});

app.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(() => res.json('Product Deleted!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

app.post('/products/update/:id', upload.single('productImage'), (req, res) => {
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
                .catch(err => res.status(400).json('Error : ' + err));
        })
        .catch(err => res.status(400).json('Error : ' + err));
});

// Ushani //

const PaymentRouter = require('./routes/payment');

app.use('/payment', PaymentRouter);

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server Running')
})