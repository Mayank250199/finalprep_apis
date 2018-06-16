var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'user/auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var User = require(__root + 'user/models/User');

// CREATES A NEW USER
router.post('/', function (req, res, next) {
var firstname = req.body.firstname;
var lastname = req.body.lastname;
var email = req.body.email;
var password = req.body.password;

  if( !firstname){
    return res.send({
      success :false,
       message:'Error:firstname can\'t be Blank'
    });
  }
  if ( !lastname ){
    return res.send({
      success :false,
       message:'Error:lastname can\'t be Blank'
    });
  }
  if(!email){
      return res.send({
      success :false,
       message:'Error:email can\'t be Blank'
    });
  }
  if(!password){
    return res.send({
      success :false,
       message:'Error:password can\'t be Blank'
    });
  }

  email = email.toLowerCase();
if(email){
   User.find({
     email:email
   },(err,previousUsers)=>{
     if(err){
       return res.send({
       success:false,
       message:"Error:server Error"
     })
   }else if(previousUsers.length>0){
       return res.send({
       success:false,
       message:"Error:Email ID already exist"
     })
   }else{
     const newUser = new User();
   newUser.firstname = firstname;
   newUser.lastname = lastname;
   newUser.email = email;
   newUser.password = newUser.generateHash(password);

   newUser.save((err,user) =>{
     if(err){
       return res.send({
       success:false,
       message:"Error:server Error"
     })
   }
       return res.send({
       success:true,
       message:"Signup successfully!!"
     })

   })
   }
});
}
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/',function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id',VerifyToken, function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id',VerifyToken, function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;
