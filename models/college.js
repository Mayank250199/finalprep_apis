var mongoose = require('mongoose');

var CollegeSchema = new mongoose.Schema({
  collegename: {
    type: String,
    default: ''
  },
  year_of_esblishment: {
      type: String,
      default: ''
  },
  connectivity: {[
    mode: {
      type:String,
      default:''
    },
    nearest: {
      type:String,
      default:''
    },
    distance: {
      type: Number,
      default: ''
    }
    description: {
      type:String,
      default:''
    }
  ]},
  ranking: {[
    type:{
      type: String,
      default: ''
    },
    description: {[
      givenby: {
        type: String,
        default: ''
      },
        rank: {
          type: Number,
          default: ''
        }
      ]}
  ]},
  fee:{[
    paritcular: {
      type:String,
      default: ''
    },
    amount: {
      type:Number,
      default: ''
    }
  ]},
  affiliation: {[
    affiliated:{
      type:String,
      default:''
    }
  ]},
  placement: {[
    year: {
      type:Number,
      default:''
    },
  placement_statistics: {[
      company: {
        type:String,
        default:''
      },
      no_of_offer: {
        type:Number,
        default:''
      }
    ]},
  company_statistics: {[
      company: {
        type:String,
        default:''
      },
      cto: {
        type:Number,
        default:''
      }
       ]}
    ]},
  cutoff: {[
    year: {
      type:Number,
      default:''
    },
    category:{
      type:Number,
      default:''
    },
    round: {[
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

    ]}

});

module.exports = mongoose.model('College', SubjectSchema);
