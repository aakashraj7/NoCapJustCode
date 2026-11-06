# Backend Registration API Contract

> Event: **LARPER OR CODER**  
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

## 2. Pair Registration

### `POST /api/register`
Registers a pair for **LARPER OR CODER** (one registration covers both **The Training Arc** and **TLE**).

- **Headers**:
  ```http
  Content-Type: application/json
  ```

### Request Payload Shape
A single registration covers both tracks for exactly 2 coders. No event selector field. Amount is never accepted from the client; it is computed server-side only.

```json
{
  "pairName": "ByteForce",
  "members": [
    {
      "fullName": "Jane Doe",
      "email": "jane@example.com",
      "phone": "9876543210",
      "college": "St. Joseph's Institute of Technology",
      "department": "Computer Science & Engineering",
      "year": "3"
    },
    {
      "fullName": "John Smith",
      "email": "john@example.com",
      "phone": "9123456780",
      "college": "St. Joseph's Institute of Technology",
      "department": "Information Technology",
      "year": "3"
    }
  ]
}
```

---

## Validation Constraints

| Field | Type | Rules |
|---|---|---|
| `pairName` | String (optional) | Max 60 characters |
| `members` | Array | Must contain **exactly 2** member objects |
| `members[i].fullName` | String | Trimmed, min 2 characters, max 100 characters |
| `members[i].email` | String | Valid email address format |
| `members[i].phone` | String | Valid 10-digit Indian phone number (`/^[6-9]\d{9}$/`) |
| `members[i].college` | String | Trimmed, min 2 characters |
| `members[i].department` | String | Trimmed, min 2 characters |
| `members[i].year` | String enum | Must be `"1"`, `"2"`, `"3"`, or `"4"` |

### Cross-Member Uniqueness Constraints
- `members[0].email.toLowerCase() !== members[1].email.toLowerCase()`
- `members[0].phone !== members[1].phone`

---

## Expected Response Shapes

### Success (`201 Created` or `200 OK`)
Amount is computed server-side (₹149 × 2 = ₹298).
```json
{
  "success": true,
  "message": "Registration received successfully",
  "registration": {
    "id": "LOC-PAIR-84920",
    "pairName": "ByteForce",
    "amount": 298,
    "members": [
      {
        "fullName": "Jane Doe",
        "email": "jane@example.com",
        "phone": "9876543210",
        "college": "St. Joseph's Institute of Technology",
        "department": "Computer Science & Engineering",
        "year": "3"
      },
      {
        "fullName": "John Smith",
        "email": "john@example.com",
        "phone": "9123456780",
        "college": "St. Joseph's Institute of Technology",
        "department": "Information Technology",
        "year": "3"
      }
    ],
    "createdAt": "2026-11-06T10:15:00.000Z"
  }
}
```

### Error (`400 Bad Request` / `422 Unprocessable Entity`)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "members.1.email",
      "message": "Member 1 and Member 2 must have different email addresses"
    }
  ]
}
```
