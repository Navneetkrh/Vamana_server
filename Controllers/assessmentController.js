const { model } = require('mongoose');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const Assessment = require('../models/assessmentModel');
const patient=require('../models/patientModel');
const SingleAssessment = require('../models/singleAssesmentModel');
const Daydata = require('../models/singleAssesmentModel');
const { json } = require('body-parser');
const { parse } = require('dotenv');


const getDashboradData=expressAsyncHandler(async (req, res) => {
    const userid=req.user._id;
    const user=await User.findById(userid);
    const dashboarddata=await Assessment.find(
        {'physicianUserName':user.username},
        {patientUhid: 1, patientName: 1}).sort({createdAt: -1});
    // populte patient and get user data

    // console.log(dashboarddata)
    res.json({
        username:user.username,
        dashboarddata,
       
    });
});
const addNewDashboardElement=expressAsyncHandler(async (req, res) => {
        const username=req.user.username;
        // res.json(req.body)
        // parse req.body and create new patient
    
        const new_patient=new patient(req.body);

        

        await new_patient.save();
    

        const new_assesment=new Assessment({
            physicianUserName:username,
            patientUhid:req.body.uhid,
            patientName:req.body.name,
            patient:new_patient,
            assessmentData:{}
            
        })
        await new_assesment.save();
        res.json(new_assesment)
}  
)
// addSingleAssesment
const addSingleAssesment = expressAsyncHandler(async (req, res) => {
    try {
        const { assessmentName, day, id, data } = req.body;

        const update = {
            [`assessmentData.${assessmentName}.days.${day}.data`]: data
        };

        const options = { new: true, upsert: true };

        const assessment = await Assessment.findByIdAndUpdate(id, update, options);

        res.json(assessment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const fetchSingleAssessment = expressAsyncHandler(async (req, res) => {
    try {
        const { id, assessmentName, day } = req.body;

        const assessment = await Assessment.findById(id, {
            [`assessmentData.${assessmentName}.days.${day}`]: 1
        });

        const data = assessment.assessmentData.get(assessmentName).days[day];

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});
// fetch my patient


// fetch patient data
const fetchSinglePatient = expressAsyncHandler(async (req, res) => {
    try {
        const { uhid } = req.body;

        const patient = await patient.findOne({ uhid });

        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});



module.exports={getDashboradData,addNewDashboardElement,addSingleAssesment,fetchSingleAssessment}