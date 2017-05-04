var User = require('../models/users')
var error = require('./error')
//var Error = require('./getError')

//function to find all users

var findAllUsers = function (req, res) {

    User.find({}, function (err, user) {

        if (err) {
            error.geterror(err)
            res.send(err).end()
        }
        else if (!user.length) {
            var err = { message: "no records found" }
            error.geterror(err)
            res.send(err)
        }
        else {
            res.send(user)
        }
    })

}

module.exports = findAllUsers