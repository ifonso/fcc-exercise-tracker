# Simple API Documentation

This is a simple API for freecodecamp backend certification. You're able to create new users and register exercises.

## Entities

### User
```json
{
    "_id": "string",
    "username": "string",
    "exercises": [Exercise]
}
```

### Exercise
```json
{
    "description": "string",
    "duration": "number",
    "date": "string"
}
```

## Endpoints

### ⚡️ Create a User

- **HTTP Method:** POST
- **Endpoint:** `/users`
- **Description:** Creates a new user.
- **Request Body:**
  - Content Type: `application/x-www-form-urlencoded`
  - Data Format: URL-encoded key-value pairs.

  **Request Body Parameters**:
  - `username` (string): The username of the new user.

- **Response:**
  - 200 OK: Successful user creation.
    - `_id` (string): The unique identifier for the created user.
    - `username` (string): The username of the created user.
  - 400 Bad Request: If the request body is invalid.

### ⚡️ Get All Users

- **HTTP Method:** GET
- **Endpoint:** `/users`
- **Description:** Retrieves a list of all users.

**Response:**

- 200 OK: Successful retrieval of the user list.
  - An array of user objects, each containing:
    - `_id` (string): The unique identifier for the user.
    - `username` (string): The username of the user.
- 500 Internal Server Error: If there's an application error.

### ⚡️ Create an Exercise for a User

- **HTTP Method:** POST
- **Endpoint:** `/users/:_id/exercises`
- **Description:** Creates a new exercise entry for a specific user.

**URL Parameters:**
- `_id` (string): The unique identifier of the user for whom the exercise is being created.

**Request:**

- **Content Type:** `application/x-www-form-urlencoded`
- **Data Format:** URL-encoded key-value pairs.

**Request Body Parameters:**
- `description` (string): Description of the exercise.
- `duration` (number): Duration of the exercise in minutes.
- `date` (string, optional): Date of the exercise in the format "YYYY-MM-DD" (default is the current date if not provided).

### ⚡️ Get User Exercise Logs

- **HTTP Method:** GET
- **Endpoint:** `/users/:_id/logs`
- **Description:** Retrieves exercise logs for a specific user with optional filtering and limiting.

**URL Parameters:**
- `_id` (string): The unique identifier of the user for whom exercise logs are being retrieved.

**Query Parameters:**
- `from` (string, optional): Start date for filtering exercises (inclusive). Format: "YYYY-MM-DD".
- `to` (string, optional): End date for filtering exercises (inclusive). Format: "YYYY-MM-DD".
- `limit` (number, optional): Maximum number of exercise logs to return.

**Response:**

- 200 OK: Successful retrieval of exercise logs.
  - `_id` (string): The unique identifier for the user.
  - `username` (string): The username of the user.
  - `count` (number): Total count of exercise logs.
  - `log` (array of objects): An array of exercise log entries, each containing:
    - `description` (string): Description of the exercise.
    - `duration` (number): Duration of the exercise in minutes.
    - `date` (string): Date of the exercise in "YYYY-MM-DD" format.
- 400 Bad Request: If there are query parameter validation errors.
- 500 Internal Server Error: If there's an application error.