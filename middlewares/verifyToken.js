
var jwt = require('jsonwebtoken');
var config = require('../config');
var error = require('./error')
// var multer = require('multer');
var User = require('../models/users')

//function for authenticate the user

var verifyToken = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, currUser) {
            if (err) {
                error.geterror(err)
                res.send(err);
            }
            else {
                req.currUser = currUser._doc;
                console.log("user is verified")
                next();
                // var storage = multer.diskStorage({
                //     destination: function (req, file, callback) {
                //         callback(null, './uploads');
                //     },
                //     filename: function (req, file, callback) {
                //         var datetimestamp = Date.now();
                //         //var picname = file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
                //         callback(null, file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
                //     },


                //     fileFilter: function (req, file, cb) {
                //         if (path.extension(file.originalname) === '.png' || path.extension(file.originalname) === '.jpg') {
                //             return cb(null, true)
                //         }
                //         else {
                //             cb(null, false)
                //         }
                //     }

                // });


                // var upload = multer({
                //     storage: storage, limits: {
                //         fileSize: 1024 * 1024
                //     },
                // }).array('photos', 12);


                // upload(req, res, function (err, result) {
                //     if (err) {
                //         return res.end("Error uploading file.");
                //     }
                //     else {
                //         res.send("File is uploaded successfully!");
                //         var pic = req.files[0]
                //         User.findByIdAndUpdate(currUser._doc._id, { $addToSet: { pic: pic.path } }, function (err) {
                //             if (err) {
                //                 error.geterror(err)
                //                 console.log(err)
                //             }
                //             else {
                //                 console.log("your picture has been uploaded to database");
                //             }
                //         });
                //     }
                // });

            }
        });


    }
    else {
        res.send(401, "no token provided");
    }

};
module.exports = verifyToken;