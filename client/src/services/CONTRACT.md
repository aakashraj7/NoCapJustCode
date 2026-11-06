# Backend Registration API Contract

> Event: **LARPER OR CODER** (part of CodeVerse 2026, presented by Celestials)  
> This contract defines the endpoints, request/response structures, and validation rules expected by the frontend.

---

## 1. Health Check

### `GET /health`
Verifies backend server status.

- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "server is healthy"
}
```

---

## 2. Participant Registration

### `POST /api/register`
Registers an individual for **The Training Arc** (Workshop) or a team for **TLE: Think, Lock In, Execute** (DEADLOCK Competition).

- **Headers**:
  ```http
  Content-Type: application/json
  ```

### Request Payload Shapes

#### A. The Training Arc (Individual Registration)
```json
{
  "event": "training-arc",
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "college": "St. Joseph's Institute of Technology",
  "department": "Computer Science & Engineering",
  "year": "3"
}
```

#### B. TLE: Think, Lock In, Execute (Team of 2 to 4)
Main applicant is Member 1 (Team Lead). `teamDetails.members` contains the remaining members (`teamSize - 1`).
```json
{
  "event": "tle",
  "fullName": "Alex Smith",
  "email": "alex@example.com",
  "phone": "9876543210",
  "college": "St. Joseph's Institute of Technology",
  "department": "Information Technology",
  "year": "3",
  "teamDetails": {
    "teamName": "ByteForce",
    "teamSize": 3,
    "members": [
      {
        "fullName": "Rohan Kumar",
        "email": "rohan@example.com",
        "phone": "9123456780"
      },
      {
        "fullName": "Priya Nair",
        "email": "priya@example.com",
        "phone": "9812345678"
      }
    ]
  }
}
```

---

## Validation Constraints

| Field | Type | Rules |
|---|---|---|
| `event` | String enum | Must be `"training-arc"` or `"tle"` |
| `fullName` | String | Trimmed, min 2 characters, max 100 characters |
| `email` | String | Valid email address format |
| `phone` | String | Valid 10-digit Indian phone number (`/^[6-9]\d{9}$/`) |
| `college` | String | Trimmed, min 2 characters |
| `department` | String | Trimmed, min 2 characters |
| `year` | String enum | Must be `"1"`, `"2"`, `"3"`, or `"4"` |
| `teamDetails` | Object | Required if `event === "tle"`, disallowed if `event === "training-arc"` |
| `teamDetails.teamName` | String | Min 2 characters, max 60 characters |
| `teamDetails.teamSize` | Number | Integer between `2` and `4` inclusive |
| `teamDetails.members` | Array | Must contain exactly `teamSize - 1` objects with `fullName`, `email`, and `phone` |

---

## Expected Response Shapes

### Success (`201 Created` or `200 OK`)
```json
{
  "success": true,
  "message": "Successfully locked in for LARPER OR CODER",
  "registration": {
    "id": "REG-2026-LOC-84920",
    "event": "tle",
    "fullName": "Alex Smith",
    "email": "alex@example.com",
    "teamName": "ByteForce",
    "timestamp": "2026-11-06T08:30:00.000Z"
  }
}
```

### Validation Error (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "phone",
      "message": "Enter a valid 10-digit phone number"
    }
  ]
}
```

### Server Error (`500 Internal Server Error`)
```json
{
  "success": false,
  "message": "Internal server error. Please try again later."
}
```
