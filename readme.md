# Vamana API Usage

This document provides a brief overview of how to use the APIs provided in `assessmentController.js` and `userController.js`.

## API Endpoints

### `login`

This endpoint handles login . If the user exists and the password is correct, it logs in the user. If the user doesn't exist, it responds with a message indicating that the user doesn't exist. 

**Method:** POST

**URL:** `/login`

**Request Body:** A JSON object containing the username and password.
Example
```json
{
    "username": "test",
    "password": "test"
}
```

**Response:** A JSON object containing the user id, a remark indicating whether login or signup was successful, the username, and a token.

### Signup

This endpoint creates a new user and logs them in.
**Method:** POST
**URL:** `/signup`

**Request Body:** A JSON object containing the username and password.

```json
{
    "username": "test",
    "password": "test"
}
```

**Response:** A JSON object containing the user id, a remark indicating whether login or signup was successful, the username, and a token.

```json
{
    "userId": "5f9b3b3b1f3b3b3b1f3b3b3b",
    "remark": "Signup successful",
    "username": "test",
    "token": "eyJhbGgvhvjhgvvtffutfu"
}

```

### `getDashboardData`

This endpoint retrieves the dashboard data for a specific user.

**Method:** GET

**URL:** `/dashboard`

**Headers:** `Authorization: Bearer <your-token>`

**Response:** A JSON object containing the username and the dashboard data.
```json
{
    "username" : "physician-username",
    "dashboarddata": [
        {
            "_id": "AssessmentID",
            "patientUhid": "patient-UHID",
            "patientName": "patient-name"
        }]
}
```

### `addNewDashboardElement`

This endpoint adds a new patient and assessment to the dashboard.

**Method:** POST

**URL:** `/add`

**Headers:** `Authorization: Bearer <your-token>`

**Request Body:** A JSON object containing the patient details.
Example
```json
{
    "uhid": "nav001",
    "name": "bill doors",
    "DOB": "1990-01-01",
    "occupation": "Software Engineer",
    "address": "123 Main St, Anytown, USA",
    "pastIllness": "None",
    "medicalHistory": "No known allergies",
    "complaints": {
        "complaint1": "Headache",
        "complaint2": "Fatigue"
    },
    "investigations": {
        "bloodTest": "Normal",
        "xray": "Clear"
    },
    "poorvaKarma": {
        "procedure1": "Panchakarma",
        "procedure2": "Nasya"
    }
}
```

**Response:** A JSON object containing the new assessment data.

### `addSingleAssessment`

This endpoint updates a specific day's data for a specific assessment.

**Method:** POST

**URL:** `/addsingle`

**Headers:** `Authorization: Bearer <your-token>`

**Request Body:** A JSON object containing the assessment name, day, id, and data.


example
```json
{

    "assessmentName":"aam",
    "day":"4",
    "id":"66699d43a0fdc9f235a04d76",
    "data":{
        "t1":"99",
        "t2":"1",
        "t3":"3"
        
    }

}
```

**Response:** A JSON object containing the updated assessment data.

### `fetchSingleAssessment`

This endpoint retrieves a specific day's data for a specific assessment.

**Method:** POST

**URL:** `/fetchsingle`

**Headers:** `Authorization: Bearer <your-token>`

**Request Body:** A JSON object containing the assessment name, day, and id.
Example

```json
{   
    "id":"66699d43a0fdc9f235a04d76",
    "assessmentName":"aam",
    "day":"2"
    
}
```


**Response:** A JSON object containing the requested assessment data.

### `fetchPatientData`

**Method:** POST
**URL:** `/fetchpatient`

**Headers:** `Authorization: Bearer`

**Request Body:** A JSON object containing the patient ID (not uhid).
Example
```json
{
    "patientid":"66699d12a0fdc9f235a04d5b"
}

```

**Response:** A JSON object containing the patient data.
```json
{
    "_id": "66699d12a0fdc9f235a04d5b",
    "uhid": "UH123456",
    "name": "John Doe",
    "DOB": "1990-01-01",
    "occupation": "Software Engineer",
    "address": "123 Main St, Anytown, USA",
    "pastIllness": "Chickenpox, Measles",
    "medicalHistory": "No known allergies. Hypertension diagnosed in 2015.",
    "complaints": {
        "symptom1": "Headache",
        "symptom2": "Fever",
        "symptom3": "Cough"
    },
    "investigations": {
        "bloodTest": "Normal",
        "xray": "No issues",
        "ctScan": "Clear"
    },
    "poorvaKarma": {
        "procedure1": "Appendectomy in 2010",
        "procedure2": "Dental surgery in 2018"
    },
    "__v": 0
}
```

if patient not found,then empty string is returned.
if any error occurs,then error message is returned with 500 status code.


## Error Handling

Endpoints return a 500 status code and an error message in case of an error.
