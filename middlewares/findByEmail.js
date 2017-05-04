var User = require('../models/users')
var error = require('./error')
//var Error = require('./getError')

//function for inding user by its email

var findByEmail = function (req, res) {

    var email = req.body.email || req.params.email || req.query.email
    if (email == undefined) {
        var err = { message: "Please enter the email" }
        error.geterror(err)
        res.send(err)
    }
    else {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                error.geterror(err)
                res.send(err)
            }
            else if (!user) {
                var err = { message: "no user is registered with this email" }
                error.geterror(err)
                res.send(err)
            }
            else {
                res.send(user)
            }

        })

    }
}

module.exports = findByEmail
