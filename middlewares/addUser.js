var User = require('../models/users')
var error = require('./error')
var bcrypt = require('bcryptjs')

var salt = 10


//function for adding users

var addUser = function (req, res) {

    if (req.body.email) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                error.geterror(err)
                res.send(err).end()
            }
            else {
                if (user) {
                    var err = { message: "User already exist please sign up with different email id" }
                    error.geterror(err)
                    res.json(err)
                }
                else {
                    if (req.body.name == undefined || req.body.email == undefined || req.body.password == undefined || req.body.dob == undefined
                        || req.body.address == undefined || req.body.age == undefined || req.body.gender == undefined) {
                        var err = { message: "Please fill all the fields properly" }
                        error.geterror(err)
                        res.send(err)
                    }
                    else {
                        var hashed = bcrypt.hashSync(req.body.password, salt)

                        var user = new User()
                        user.name = req.body.name;
                        user.email = req.body.email;
                        user.password = hashed;
                        user.dob = req.body.dob;
                        user.address = req.body.address;
                        user.age = req.body.age;
                        user.gender = req.body.gender;

                        user.save(function (err) {
                            if (err) {
                                error.geterror(err)
                                res.send({ message: 'Failed to add user please see error ->>>>' + err });
                            } else {
                                res.send({ message: 'User added successfully please sign in with your email and password' });
                            }
                        });
                    }
                }
            }
        })
    }
    else {
        res.send({ message: "Please fill all the fields properly" })
    }
}




module.exports = addUser
