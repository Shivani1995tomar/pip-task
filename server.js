//requiring all modules

var express = require('express')
var multer = require('multer')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var addUser = require('./middlewares/addUser')
var findAllUsers = require('./middlewares/findAllUsers')
var findByEmail = require('./middlewares/findByEmail')
var findByName = require('./middlewares/findByName')
var forgotPassword = require('./middlewares/forgotPassword')
var login = require('./middlewares/login')
var removeUser = require('./middlewares/removeUser')
var updateUser = require('./middlewares/updateUser')
var verifyToken = require('./middlewares/verifyToken')
var uploadPic = require('./middlewares/uploadPic')
var viewPics = require('./middlewares/viewPics')



//connecting mongodb

mongoose.connect('mongodb://127.0.0.1:27017/fb')

var app = express()
var router = express.Router()
var port = process.env.PORT || 8081

//using body parser tp parse json

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function (req, res) { res.send("welcome to facebook") })

app.use('/api', router)
//routing all middlewares
router.get('/findallusers', findAllUsers)
router.post('/adduser', addUser)
router.post('/findbyemail/', findByEmail)
router.post('/findbyname/', findByName)
router.post('/forgotpassword', forgotPassword)
router.post('/uploadpic', verifyToken, uploadPic)
router.post('/login', login)
router.delete('/removeuser/:id', removeUser)
router.put('/updateuser:id', updateUser)
router.get('/viewpic', verifyToken, viewPics)


//listening on port 8081

app.listen(port, function () {
    console.log('app is listening on port ' + port)
})