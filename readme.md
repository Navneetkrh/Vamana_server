# Assessment API Usage

This document provides a brief overview of how to use the APIs provided in `assessmentController.js` and `userController.js`.

## API Endpoints

### `loginSignup`

This endpoint handles both login and signup operations. If the user exists and the password is correct, it logs in the user. If the user doesn't exist, it creates a new user and logs them in.

**Method:** POST

**URL:** `/login`

**Request Body:** A JSON object containing the username and password.

**Response:** A JSON object containing the user id, a remark indicating whether login or signup was successful, the username, and a token.

### `getDashboardData`

This endpoint retrieves the dashboard data for a specific user.

**Method:** GET

**URL:** `/dashboard`

**Headers:** `Authorization: Bearer <your-token>`

**Response:** A JSON object containing the username and the dashboard data.

### `addNewDashboardElement`

This endpoint adds a new patient and assessment to the dashboard.

**Method:** POST

**URL:** `/add`

**Headers:** `Authorization: Bearer <your-token>`

**Request Body:** A JSON object containing the patient details.

**Response:** A JSON object containing the new assessment data.

### `addSingleAssessment`

This endpoint updates a specific day's data for a specific assessment.

**Method:** POST

**URL:** `/addsingle`

**Headers:** `Authorization: Bearer <your-token>`

**Request Body:** A JSON object containing the assessment name, day, id, and data.

**Response:** A JSON object containing the updated assessment data.

### `fetchSingleAssessment`

This endpoint retrieves a specific day's data for a specific assessment.

**Method:** POST

**URL:** `/fetchsingle`

**Headers:** `Authorization: Bearer <your-token>`

**Request Body:** A JSON object containing the assessment name, day, and id.

**Response:** A JSON object containing the requested assessment data.

## Error Handling

Endpoints return a 500 status code and an error message in case of an error.