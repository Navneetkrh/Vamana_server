const { model } = require('mongoose');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const Assessment = require('../models/assessmentModel');
const patient=require('../models/patientModel');
const SingleAssessment = require('../models/singleAssesmentModel');


const getDashboradData=expressAsyncHandler(async (req, res) => {
    const userid=req.user._id;
    const user=await User.findById(userid);
    const dashboarddata=await Assessment.find({'physicianUserName':user.username})
    // populte patient and get user data

    // console.log(dashboarddata)
    res.json({
        username:user.username,
        dash:dashboarddata
       
    });
});
const addNewDashboardElement=expressAsyncHandler(async (req, res) => {
        const username=req.user.username;
        // res.json(req.body)
        const new_patient=new patient(req.body)
        

        await new_patient.save();
    

        const new_assesment=new Assessment({
            physicianUserName:username,
            patientUhid:req.body.uhid,
            patientName:req.body.name,
            patient:new_patient,
            
        })
        await new_assesment.save();
        res.json(new_assesment)
}  
)

const addSingleAssesment=expressAsyncHandler(async (req,res) =>{
    const {assessmentName,day,id}=req.body;
    // update assesments in Assessment 
    const assessment=await Assessment.findById({_id:id});
    // if assessmentName is not a key in assessment.assessments
    // create a new SingleAssessment 
    // eupdate the current day in assessment.assessment[assessmentName].days[day]
    const data_to_update={
        number:day,
        data:req.body
    
    }
    await assessment.UpdateOne({$set:{[`assessments.${assessmentName}.days.${day}`]:data_to_update}})
    res.json(assessment)
   
    
}
)
module.exports={getDashboradData,addNewDashboardElement}