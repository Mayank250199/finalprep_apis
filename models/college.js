var mongoose = require('mongoose');

var CollegeSchema = new mongoose.Schema({
  collegename: {
    type: String,
    default: ''
  },
  profile_pic:[{
      type:String,
    default: ''
}],
establishment: {
      type: String,
      default: ''
  },
  connectivity: [{
    mode: {
      type:String,
      default:' '
    },
    nearest: {
      type:String,
      default:' '
    },
    distance: {
      type: Number,
      default: ''
    },
    connectivity_description: {
      type:String,
      default:''
    }
  }],
  ranking: [{
    ranking_type:{
      type: String,
      default: ''
    },
      ranking_givenby: {
        type: String,
        default: ''
      },
        ranking_rank: {
          type: Number,
          default: ''
        }
  }],
  fee:[{
    particular: {
      type:String,
      default: ''
    },
    fee_amount: {
      type:Number,
      default: ''
    }
  }],
  affiliation: [{
      type:String,
      default:''
  }],
  placement: [{
    year: {
      type:Number,
      default:''
    },
  placement_statistics: [{
      company_name: {
        type:String,
        default:''
      },
      no_of_offer: {
        type:Number,
        default:''
      }
    }],
  company_statistics: [{
      company_name: {
        type:String,
        default:''
      },
      cto: {
        type:Number,
        default:''
      }
    }]
  }],
  cutoff: [{
    cutoff_year: {
      type:Number,
      default:''
    },
    cutoff_category:{
      type:String,
      default:''
    },
    round: [{
      region:{
        type:String,
        default:''
      },
      branch:{
        type:String,
        default:''
      },
      cutoff:{
        type:Number,
        default:''
      }
    }]
  }]

});

module.exports = mongoose.model('College', CollegeSchema);
