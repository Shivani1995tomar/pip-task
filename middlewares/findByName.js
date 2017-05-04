var User = require('../models/users')
var error = require('./error')
//var Error = require('./getError')

//function to search a user by its name

var findByName = function (req, res) {

    var name = req.body.name || req.params.name || req.query.name

    if (name == undefined) {
        var err = { message: "Please enter the name" }
        error.geterror(err)
        res.send(err)
    }
    else {
        User.findOne({ name: name }, function (err, user) {
            if (err) {
                error.geterror(err)
                res.send(err)
            }
            else if (!user) {
                var err = { message: "No user is registered with tis name" }
                error.geterror(err)
                res.send(err)
            }
            else {
                res.send(user)
            }

        })

    }
}

module.exports = findByName