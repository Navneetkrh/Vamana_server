const mongoose = require("mongoose");

const daydata=mongoose.Schema({
    number:{
        type:Number,
        required:true,
    },
    data:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
    }
    
});

const singleAssessmentModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    days:mongoose.Schema.Types.Mixed,
    extra:{
        type:mongoose.Schema.Types.Mixed,
        required:false,
    }
    
});
const SingleAssessment=mongoose.model("SingleAssessment",singleAssessmentModel);
module.exports=SingleAssessment;
module.exports=daydata;