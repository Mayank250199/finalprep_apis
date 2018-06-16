var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require("fs");

var VerifyToken = require(__root + 'user/auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
var Subject = require(__root + 'user/models/Subject');

//storage method in multer
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __root + './uploads/Notes');
  },
  filename: function (req, file, callback) {
    callback(null,  Date.now()+ '-' +file.originalname);
  }
});

var upload = multer({ storage : storage});


/** API for single file upload */
router.post('/',upload.single('upload_file'), function(req, res) {

  if(!req.file){
      return res.send({
      success :false,
       message:'Error:upload_file can\'t be Blank'
    });
  }
  var subject = req.body.subject;
  var semester = req.body.semester;
  var fileName = req.body.fileName;
  var filepath = req.file.path;
  var branch= req.body.branch;


  if( !subject ){
    return res.send({
      success :false,
       message:'Error:subject can\'t be Blank'
    });
  }
  if ( !semester ){
    return res.send({
      success :false,
       message:'Error:semester can\'t be Blank'
    });
  }
  if(!fileName){
      return res.send({
      success :false,
       message:'Error:fileName can\'t be Blank'
    });
  }
  if(!branch){
      return res.send({
      success :false,
       message:'Error:branch can\'t be Blank'
    });
  }

      const newSubject = new Subject();
    newSubject.subject = subject;
    newSubject.semester = semester;
    newSubject.fileName = fileName;
    newSubject.filepath = filepath;
    newSubject.branch = branch;
    newSubject.save((err,user) =>{
      if(err){
        return res.send({
        success:false,
        message:"Error:server Error"
      })
    }
        return res.send({
        success:true,
        message:"Subject Upload successfully!!"
      })

    })
    });


    // RETURNS ALL THE USERS IN THE DATABASE
    router.get('/',function (req, res) {
        Subject.find({}, function (err, users) {
            if (err) return res.status(500).send("There was a problem finding the users.");
            res.status(200).send(users);
        });
    });

    // GETS A SINGLE USER FROM THE DATABASE
    router.get('/:id',VerifyToken, function (req, res) {
        Subject.findById(req.params.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            res.status(200).send(user);
        });
    });

    // DELETES A USER FROM THE DATABASE
    router.delete('/:id', function (req, res) {
        Subject.findByIdAndRemove(req.params.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem deleting the user.");
            res.status(200).send("User: "+ user.name +" was deleted.");
        });
    });

    // UPDATES A SINGLE USER IN THE DATABASE
    // Added VerifyToken middleware to make sure only an authenticated user can put to this route
    router.put('/:id',VerifyToken, function (req, res) {
        Subject.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.status(200).send(user);
        });
    });


module.exports = router;
