var User = require('../models/users')
var error = require('./error')
var generator = require('generate-password');
var bcrypt = require('bcryptjs')
var salt = 10
//var Error = require('./getError')

//function for forgot password functionality

var forgotPassword = function (req, res, next) {

    var email = req.body.email
    if (email == undefined) {
        var err = { message: "Please enter the email" }
        error.geterror(err)
        res.send(err)
    }
    else {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                //var err = { message: "Please enter the email" }
                error.geterror(err)
                res.send(err)
            }
            else if (!user) {
                var err = { message: "Please enter valid email" }
                error.geterror(err)
                res.send(err)
            }
            else {
                var password = generator.generate({
                    length: 10,
                    numbers: true
                });

                var hashed = bcrypt.hashSync(password, salt)

                User.findByIdAndUpdate({ _id: user.id }, { $set: { password: hashed } }, function (err) {
                    if (err) {
                        error.geterror(err)
                        res.send(err)
                    }
                    res.send({ message: "your password has been updated", password: password });
                });

            }

        })

    }
}

module.exports = forgotPassword
