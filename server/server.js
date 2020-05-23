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
        lastname: req.user.lastname
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


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server Running')
})