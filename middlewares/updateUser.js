var User = require('../models/users')
var error = require('./error')
//var Error = require('./getError')

//function for updating the user info

var updateUser = function (req, res) {

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
        User.findOne({ _id: uid }, function (err, user) {
            if (err) {
                //var err = { message: "user id is not provided" }
                error.geterror(err)
                res.send(err)
            }
            else if (!user) {
                var err = { message: "No user found" }
                error.geterror(err)
                res.send(err)
            }
            else if (user) {
                user.name = req.body.name;
                user.email = req.body.email;
                user.password = req.body.password;
                user.dob = req.body.dob;
                user.address = req.body.address;
                user.age = req.body.age;
                user.gender = req.body.gender

                user.save(function (err) {
                    if (err) {
                        //var err = { message: "user id is not provided" }
                        error.geterror(err)
                        res.send(err)
                    }
                    else {
                        res.send({ message: "User is updated" })
                    }
                })

            }


        })

    }
}

module.exports = updateUser