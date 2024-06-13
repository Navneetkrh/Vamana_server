# Vamana API Usage

This document provides a brief overview of how to use the APIs provided in `assessmentController.js` and `userController.js`.

## API Endpoints

### `loginSignup`

This endpoint handles both login and signup operations. If the user exists and the password is correct, it logs in the user. If the user doesn't exist, it creates a new user and logs them in.

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

### `getDashboardData`

This endpoint retrieves the dashboard data for a specific user.

**Method:** GET

**URL:** `/dashboard`

**Headers:** `Authorization: Bearer <your-token>`

**Response:** A JSON object containing the username and the dashboard data.
```json
{
    "username" : "physician-username",
    "dash" : [{"_id" : "AssessmentId",
                "patientUhid" : "uhid",
                "patientName" : "patient-name",
                "patient" : "Reference Of Patient ObjectID",
                "__v" : 0
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

## Error Handling

Endpoints return a 500 status code and an error message in case of an error.
