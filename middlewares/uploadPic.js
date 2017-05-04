var User = require('../models/users')
var error = require('./error')
var multer = require('multer');

//function or uploading pics by authenticated user

var uploadPic = function (req, res) {

    // if (req.body.email == req.currUser.email) {

    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            var datetimestamp = Date.now();
            //var picname = file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
            callback(null, file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        },


        fileFilter: function (req, file, cb) {
            if (path.extension(file.originalname) === '.png' || path.extension(file.originalname) === '.jpg') {
                return cb(null, true)
            }
            else {
                cb(null, false)
            }
        }

    });


    var upload = multer({
        storage: storage, limits: {
            fileSize: 1024 * 1024
        },
    }).array('photos', 12);


    upload(req, res, function (err, result) {
        if (err) {
            return res.end("Error uploading file.");
        }
        else {
            res.send("File is uploaded successfully!");
            var pic = req.files[0]
            User.findByIdAndUpdate(req.currUser._id, { $addToSet: { pic: pic.path } }, function (err) {
                if (err) {
                    error.geterror(err)
                    console.log(err)
                }
                else {
                    console.log("your picture has been uploaded to database");
                }
            });
        }
    });

    // }

    // else {

    //     res.sendStatus(401)
    // }
}

module.exports = uploadPic