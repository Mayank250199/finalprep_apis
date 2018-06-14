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
  var fileName = req.body.fileName;
  var profile_pic = req.file.path;
  var connectivity_mode = req.body.connectivity_mode;
  var connectivity_nearest = req.body.connectivity_nearest;
  var connectivity_distance = req.body.connectivity_distance;
  var connectivity_description = req.body.connectivity_description;
  var ranking_type = req.body.ranking_type;
  var ranking_description_givenby = req.body.ranking_description_givenby;
  var ranking_description_rank = req.body.ranking_description_rank;
  var fee_particular = req.body.fee_particular;
  var fee_amount = req.body.fee_amount;
  var affiliation = req.body.affiliated;
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
      newCollege.fileName = fileName;
      newCollege.profile_pic.pic = req.file.path;
      newCollege.connectivity.mode = connectivity_mode;
      newCollege.connectivity.nearest = connectivity_nearest;
      newCollege.connectivity.distance = connectivity_distance;
      newCollege.connectivity.connectivity_description = connectivity_description;
      newCollege.ranking.rank_type = ranking_type;
      newCollege.ranking.given_by = ranking_description_givenby;
      newCollege.ranking.rank = ranking_description_rank;
      newCollege.fee.particular = fee_particular;
      newCollege.fee.amount = fee_amount;
      newCollege.affiliation.affiliated = affiliation;
      newCollege.placement.year = placement_year;
      newCollege.placement.placement_statistics.company_name = placement_placement_statistics_company_name;
      newCollege.placement.placement_statistics.no_of_offer = placement_placement_statistics_no_of_offer;
      newCollege.placement.company_statistics.company_name = placement_company_statistics_company_name;
      newCollege.placement.company_statistics.cto = placement_company_statistics_cto;
      newCollege.cutoff.year = cutoff_year;
      newCollege.cutoff.category = cutoff_category;
      newCollege.cutoff.round.region = cutoff_round_region;
      newCollege.cutoff.round.branch = cutoff_round_branch;
      newCollege.cutoff.round.cutoff = cutoff_round_cutoff;

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
