var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require("fs");

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
var College = require(__root + 'models/College');

//storage method in multer
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/Colleges');
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

  var collegename = req.body.collegename;
  var establishment = req.body.establishment;
  var profile_pic = req.file.path;
  var connectivity_mode = req.body.connectivity_mode;
  var connectivity_nearest = req.body.connectivity_nearest;
  var connectivity_distance = req.body.connectivity_distance;
  var connectivity_description = req.body.connectivity_description;
  var ranking_type = req.body.ranking_type;
  var ranking_givenby = req.body.ranking_givenby;
  var ranking_rank = req.body.ranking_rank;
  var fee_particular = req.body.fee_particular;
  var fee_amount = req.body.fee_amount;
  var affiliation = req.body.affiliation;
  var placement_year = req.body.placement_year;
  var placement_placement_statistics_company_name = req.body.placement_placement_statistics_company_name;
  var placement_placement_statistics_no_of_offer = req.body.placement_placement_statistics_no_of_offer;
  var placement_company_statistics_company_name = req.body.placement_company_statistics_company_name;
  var placement_company_statistics_cto = req.body.placement_company_statistics_cto;
  var cutoff_year = req.body.cutoff_year;
  var cutoff_category = req.body.cutoff_category;
  var cutoff_round_region = req.body.cutoff_round_region;
  var cutoff_round_branch = req.body.cutoff_round_branch;
  var cutoff_round_cutoff = req.body.cutoff_round_cutoff;


      const newCollege = new College();
      newCollege.collegename = collegename;
      newCollege.establishment = establishment;
      newCollege.profile_pic.push(req.file.path);
      newCollege.connectivity.push({mode:connectivity_mode,nearest:connectivity_nearest,distance:connectivity_distance,connectivity_description:connectivity_description});
      newCollege.ranking.push({rank_type:ranking_type,ranking_givenby:ranking_givenby,ranking_rank:ranking_rank});
      newCollege.fee.push({particular:fee_particular,fee_amount:fee_amount});
      newCollege.affiliation.push(affiliation);
      newCollege.placement.push({year:placement_year,placement_statistics:{company_name:placement_placement_statistics_company_name, no_of_offer:placement_placement_statistics_no_of_offer},company_statistics:{company_name:placement_company_statistics_company_name, cto:placement_company_statistics_cto}});
      newCollege.cutoff.push({cutoff_year:cutoff_year,cutoff_category:cutoff_category,round:{region:cutoff_round_region,branch:cutoff_round_branch,cutoff:cutoff_round_cutoff}});

    newCollege.save((err,user) =>{
      if(err){
        // return res.send({
        // success:false,
        // message:"Error:server Error"
        throw(err);
      }
        return res.send({
        success:true,
        message:"College Upload successfully!!"
      })

    })
    });

  // RETURNS ALL THE USERS IN THE DATABASE
    router.get('/',function (req, res) {
        College.find({}, function (err, colleges) {
            if (err) return res.status(500).send("There was a problem finding the users.");
            res.status(200).send(colleges);
        });
    });

    // DELETES A USER FROM THE DATABASE
    router.delete('/:id', function (req, res) {
        College.findByIdAndRemove(req.params.id, function (err, college) {
            if (err) return res.status(500).send("There was a problem deleting the user.");
            res.status(200).send("College: "+ college.collegename +" was deleted.");
        });
    });

    router.put('/:id',VerifyToken, function (req, res) {
        College.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, college) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.status(200).send(college);
        });
     });

module.exports = router;
