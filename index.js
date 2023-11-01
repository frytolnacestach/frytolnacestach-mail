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
const follower = require("./api/follower");
const passwordLost = require("./api/password-lost");
const test = require("./api/test");
//CONSTS - END


//API
app.use("/api/registration", registration);
app.use("/api/activation", activation);
app.use("/api/follower", follower);
app.use("/api/password-lost", passwordLost);
app.use("/api/test", test);
//API - END


//pages
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/pages/index.html'));
});
router.get('/docs',function(req,res){
    res.sendFile(path.join(__dirname+'/pages/docs.html'));
});

//templates for emails
router.get('/templates/aktivace.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/aktivace.html'));
});
router.get('/templates/obnoveni-hesla.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/obnoveni-hesla.html'));
});
router.get('/templates/registration.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/registration.html'));
});
router.get('/templates/sledovani.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/sledovani.html'));
});
router.get('/templates/test.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/test.html'));
});

//templates-block for emails
router.get('/templates/block-base/footer.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/block-base/footer.html'));
});
router.get('/templates/block-base/header.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/block-base/header.html'));
});
router.get('/templates/block-content/password-lost.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/block-content/password-lost.html'));
});
router.get('/templates/block-content/registration-new.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/block-content/registration-new.html'));
});
router.get('/templates/block-content/user-activation.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/block-content/user-activation.html'));
});
router.get('/templates/block-content/follower.html',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/block-content/follower.html'));
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
router.get('/public/img/_base/logotype.svg',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/_base/logotype.svg'));
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