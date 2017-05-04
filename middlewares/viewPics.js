var User = require('../models/users')
var error = require('./error')

//function to fetch the pics - data from the database

var viewPics = function (req, res) {

    // if (req.currUser.email) {

    var email = req.currUser.email
    User.findOne({ email: email }, 'pic', function (err, user) {
        if (err) return handleError(err);
        else {
            res.send(user.pic)
            console.log("data fetched")
        }

    })

}

// else {

//     res.sendStatus(401)
// }
// }

module.exports = viewPics

