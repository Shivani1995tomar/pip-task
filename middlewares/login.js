var User = require('../models/users')
var error = require('./error')
//var Error = require('./getError')
var jwt = require('jsonwebtoken')
var config = require('../config')
var bcrypt = require('bcryptjs')

// function for logging in of user

var login = function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	if (email == undefined || password == undefined) {
		var err = { message: "Please enter email and password" }
		error.geterror(err)
		res.send(err);
	}
	else {

		User.findOne({ email: email }, function (err, user) {
			if (err) {
				//var err = { message: "Please enter the email" }
				error.geterror(err)
				res.error(err);
			} else if (!user) {
				res.sendStatus(401);
			}
			else if (user) {
				if (!bcrypt.compareSync(req.body.password, user.password)) {
					res.sendStatus(401);
				} else {
					var token = jwt.sign(user, config.secret, {
						expiresIn: 24 * 60 * 60
					});
					res.json({
						success: true,
						message: 'Token generated and you are logged in successfully',
						token: token,
						currentUserEmail: user.email

					});

				}
			}
		});

	}
}
module.exports = login