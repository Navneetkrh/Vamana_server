const express = require('express');
const dotenv = require('dotenv');
const {default: mongoose} = require('mongoose');
const expressAsyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const {login,signup}= require('./Controllers/userController');
const { protect } = require("./middlewares/authMiddleware");
const setupCronJob = require('./cron');
const {getDashboradData,addNewDashboardElement,addSingleAssesment,fetchSingleAssessment,fetchPatient}=require('./Controllers/assessmentController');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
connectDb();


app.get('/', (req, res) => {
    res.send('API is running');
});


app.post('/login',login )   
app.post('/signup',signup)
app.get('/dashboard',protect,getDashboradData)
app.post('/add',protect,addNewDashboardElement)
app.post('/addsingle',protect,addSingleAssesment)
app.post('/fetchsingle',protect,fetchSingleAssessment)
app.post('/patient',protect,fetchPatient)


// cron job setup for api calling
const apiUrl = process.env.API_URL;
setupCronJob(apiUrl);


const PORT = process.env.PORT || 5000;
const server=app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});