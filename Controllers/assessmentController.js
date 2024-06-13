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
// addSingleAssesment
const addSingleAssesment = expressAsyncHandler(async (req, res) => {
    const { assessmentName, day, id, data } = req.body;

    // Find the assessment by id
    const assessment = await Assessment.findById(id);

    if (!assessment) {
        res.status(404);
        throw new Error('Assessment not found');
    }

    // Ensure the assessments field and nested structures exist
    if (!assessment.assessments) {
        assessment.assessments = {};
    }

    // Ensure the specific assessment name exists
    if (!assessment.assessments[assessmentName]) {
        assessment.assessments[assessmentName] = { days: {} };
    }

    // Ensure the days field exists for the specific assessment name
    if (!assessment.assessments[assessmentName].days) {
        assessment.assessments[assessmentName].days = {};
    }

    // Update the specific day for the given assessmentName
    const dataToUpdate = {
        number: day,
        data: data,
    };

    // Ensure the day exists as an array for the specific assessment name
    if (!Array.isArray(assessment.assessments[assessmentName].days[day])) {
        assessment.assessments[assessmentName].days[day] = [];
    }

    // Add the new data to the day array for the specific assessment name
    assessment.assessments[assessmentName].days[day].push(dataToUpdate);

    // Save the updated assessment document
    await assessment.save();

    // Return the updated assessment
    res.json(assessment);
});


const fetchSingleAssessment = expressAsyncHandler(async (req, res) => {
    const { id, assessmentName, day } = req.body;
    const assessment=await Assessment.findById(id)
    console.log(assessment);

    try {
        // Create the projection string dynamically
        const projection = { [`assessments.${assessmentName}.days.${day}`]: 1 };

        // Find the assessment by id with the specified projection
        const assessment = await Assessment.findById(id, projection);

        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        // Extract the specific day data
        const dayData = assessment.assessments?.[assessmentName]?.days?.[day];

        if (!dayData) {
            return res.status(404).json({ message: 'Assessment data not found' });
        }

        // Return the specific day data
        res.json(dayData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports={getDashboradData,addNewDashboardElement,addSingleAssesment,fetchSingleAssessment}