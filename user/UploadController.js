var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require("fs");

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
var Subject = require(__root + 'models/Subject');

router.use(function(req, res, next) { //allow cross origin requests
    if (req.method === 'OPTIONS') {
        console.log('!OPTIONS');
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

// file upload code
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // console.log(file);
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var uploadMultiple = multer({ //multer settings
        storage: storage
    }).array('file',20);

var uploadSingle = multer({ //multer settings
        storage: storage
    }).single('file');



/** API for single file upload */
router.post('/', function(req, res) {
  console.log("test")
  var subject = req.body.subject;
  var semester = req.body.semester;
  var fileName = req.body.fileName;
  console.log("test")
  if( !subject){
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

    uploadSingle(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json(req.body.file);
    })

      const newSubject = new Subject();
    newSubject.subject = subject;
    newSubject.semester = semester;
    newSubject.fileName = fileName;

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
