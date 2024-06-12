const mongoose=require("mongoose");


const patientModel=mongoose.Schema({
    uhid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
   
    DOB: {
        type: String,
        required: true,
    },
    occupation:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    pastIllness:{
        type: String,
        required: true,
    },
    medicalHistory:{
        type: String,
        required: true,
    },
    complaints:{
        type:Map,
        required: true,
    },
    investigations:{
        type:Map,
        required: true,
    },
    poorvaKarma:{
        type: Map,
        required: true,
    },
    
});

const Patient=mongoose.model("Patient",patientModel);
module.exports=Patient;