var User = require('../models/users')
var error = require('./error')
//var Error = require('./getError')

//function for removing the user info rom database

var removeUser = function (req, res) {

    var uid
    if (req.params.id || req.query.id || req.body.id) {
        uid = req.params.id || req.query.id || req.body.id
    }
    else {
        var err = { message: "user id is not provided" }
        error.geterror(err)
        res.send(err)
    }
    if (uid) {
        User.findOneAndRemove({ _id: uid }, function (err, user) {
            if (err) {
                error.geterror(err)
                res.send(err)
            }
            else {
                res.send({ message: "user is removed" })
            }

        })

    }
}

module.exports = removeUser