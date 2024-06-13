const mongoose = require("mongoose");

const daydata=mongoose.Schema({
    number:{
        type:Number,
        required:true,
    },
    data:{
        type:Map,
        required:true,
    }
    
});

const singleAssessmentModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    days:{
        type:Map,
        of:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"daydata"

        }
    },
    extra:{
        type:mongoose.Schema.Types.Mixed,
        required:false,
    }
    
});
const Daydata=mongoose.model("Daydata",daydata);

const SingleAssessment=mongoose.model("SingleAssessment",singleAssessmentModel);
module.exports=SingleAssessment;
module.exports=Daydata;
