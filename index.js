const express = require('express')
const cors = require('cors');
const app = express()
const path = require('path');
const router = express.Router();


//body-paser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());


app.use(express.json({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//CONSTS
const registration = require("./api/registration");
const activation = require("./api/activation");
//CONSTS - END


//API
app.use("/api/registration", registration);
app.use("/api/activation", activation);
//API - END


//pages
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/pages/index.html'));
});
router.get('/docs',function(req,res){
    res.sendFile(path.join(__dirname+'/pages/docs.html'));
});

//templates for emails
router.get('/templates/registration.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/registration.html'));
});

//CSS
router.get('/public/css/main.css',function(req,res){
    res.sendFile(path.join(__dirname+'/public/css/main.css'));
});

//JS
router.get('/public/js/js_m-hamburger.js',function(req,res){
    res.sendFile(path.join(__dirname+'/public/js/js_m-hamburger.js'));
});
router.get('/public/js/js_o-cookies-dialog.js',function(req,res){
    res.sendFile(path.join(__dirname+'/public/js/js_o-cookies-dialog.js'));
});

//IMG
router.get('/public/img/_base/hero.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/_base/hero.png'));
});
router.get('/public/img/_base/logotype.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/_base/logotype.png'));
});

//Favicons
router.get('/public/img/favicons/apple-touch-icon.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/apple-touch-icon.png'));
});
router.get('/public/img/favicons/favicon-32x32.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/favicon-32x32.png'));
});
router.get('/public/img/favicons/favicon-16x16.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/favicon-16x16.png'));
});
router.get('/public/img/favicons/site.webmanifest',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/site.webmanifest'));
});
router.get('/public/img/favicons/android-chrome-192x192.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/android-chrome-192x192.png'));
});
router.get('/public/img/favicons/android-chrome-512x512.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/android-chrome-512x512.png'));
});
router.get('/public/img/favicons/favicon.ico',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/favicon.ico'));
});
router.get('/public/img/favicons/browserconfig.xml',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/browserconfig.xml'));
});

app.use('/', router);
const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server is running is port ${PORT}`))