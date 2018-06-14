var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require("fs");

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
var Subject = require(__root + 'models/Subject');

//storage method in multer
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/Notes');
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

      const newSubject = new Subject();
    newSubject.subject = subject;
    newSubject.semester = semester;
    newSubject.fileName = fileName;
    newSubject.filepath = filepath;
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



module.exports = router;
