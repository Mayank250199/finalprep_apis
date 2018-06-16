var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('../VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require(__root + 'user/models/User');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require(__root +'config');

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.render('login');
    if (!user) return res.render('login');

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.render('login');

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret);

    // return the information including token as JSON
    res.render('index',{ userid: user._id, name:user.firstname, token: token });
  });

});

router.get('/logout', function(req, res) {
  res.render('login');
});


router.get('/login',function(req, res){
  res.render('login')
})

module.exports = router;
