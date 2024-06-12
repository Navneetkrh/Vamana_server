const mongoose = require("mongoose");
const Patient = require("./patientModel");
const SingleAssessment = require("./singleAssesmentModel");
const assessmentModel = mongoose.Schema({
    physicianUserName: {
        type: String,
        required: true,
    },
    patientUhid:{
        type:String,
        required:true
    },
    patientName:{
        type:String,
        required:true
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    }
    ,
    assessments:{
        type:mongoose.Schema.Types.Mixed,
        required:false,
    }
    

    

});


const Assessment=mongoose.model("Assessment",assessmentModel);
module.exports=Assessment;