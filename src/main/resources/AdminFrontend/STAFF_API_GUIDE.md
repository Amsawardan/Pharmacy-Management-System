# Staff Management API Guide

This guide provides comprehensive documentation for the Staff Management backend APIs that support the Admin Dashboard frontend.

## Base URL
```
http://localhost:8082
```

## Staff Management Endpoints

### 1. Get All Staff Members
```
GET /staff/all
```
**Response:** List of all staff members
```json
[
  {
    "staffID": 1,
    "fullName": "Dr. Nimal Fernando",
    "username": "nimal.fernando",
    "email": "nimal.fernando@medistore.com",
    "phone": "077-123-4567",
    "department": "Pharmacy",
    "role": "STAFF",
    "status": "ACTIVE",
    "shift": "MORNING",
    "avatar": "/avatars/staff1.jpg",
    "joinDate": "2020-03-15T00:00:00",
    "lastActive": "2024-09-24T09:30:00",
    "permissions": ["inventory_manage", "prescriptions_approve", "staff_view"],
    "currentTask": "Reviewing pending prescriptions"
  }
]
```

### 2. Get Staff by ID
```
GET /staff/{staffID}
```
**Response:** Single staff member or 404 if not found

### 3. Add New Staff Member
```
POST /staff/add
```
**Request Body:**
```json
{
  "fullName": "John Doe",
  "username": "john.doe",
  "password": "password123",
  "email": "john.doe@medistore.com",
  "phone": "077-123-4567",
  "department": "Pharmacy",
  "role": "STAFF",
  "status": "ACTIVE",
  "shift": "MORNING",
  "avatar": "/avatars/default.jpg",
  "permissions": ["inventory_view", "sales"],
  "currentTask": "Customer service"
}
```

### 4. Update Staff Member
```
PUT /staff/update/{staffID}
```
**Request Body:** Same as add staff (all fields)

### 5. Delete Staff Member
```
DELETE /staff/delete/{staffID}
```
**Response:** Success message

### 6. Search Staff
```
GET /staff/search?searchTerm={term}
```
**Query Parameters:**
- `searchTerm`: Search term for name, role, department, or staff ID

### 7. Filter Staff
```
GET /staff/filter?department={dept}&status={status}&shift={shift}
```
**Query Parameters:**
- `department`: Filter by department (optional)
- `status`: Filter by status (optional)
- `shift`: Filter by shift (optional)

### 8. Get Staff by Department
```
GET /staff/department/{department}
```

### 9. Get Staff by Status
```
GET /staff/status/{status}
```
**Status Values:** `ACTIVE`, `ON_BREAK`, `OFF_DUTY`, `INACTIVE`

### 10. Get Staff by Shift
```
GET /staff/shift/{shift}
```
**Shift Values:** `MORNING`, `EVENING`, `DAY`, `NIGHT`

### 11. Get Active Staff
```
GET /staff/active
```

### 12. Update Staff Status
```
PUT /staff/status/{staffID}?status={status}
```

### 13. Update Staff Task
```
PUT /staff/task/{staffID}?currentTask={task}
```

### 14. Update Last Active Time
```
PUT /staff/active/{staffID}
```

### 15. Get Staff Statistics
```
GET /staff/statistics
```
**Response:**
```json
{
  "total": 25,
  "active": 15,
  "onBreak": 3,
  "offDuty": 7
}
```

## Admin Management Endpoints (Enhanced)

### 1. Get All Admins
```
GET /admin/all
```

### 2. Search Admins
```
GET /admin/search?searchTerm={term}
```

### 3. Get Admins by Department
```
GET /admin/department/{department}
```

### 4. Get Admin by Email
```
GET /admin/email/{email}
```

## Data Models

### Staff Model
```json
{
  "staffID": "Integer (auto-generated)",
  "fullName": "String (required)",
  "username": "String (required, unique)",
  "password": "String (required)",
  "email": "String (required)",
  "phone": "String (required)",
  "department": "String (required)",
  "role": "Role enum (ADMIN, MANAGER, STAFF)",
  "status": "StaffStatus enum (ACTIVE, ON_BREAK, OFF_DUTY, INACTIVE)",
  "shift": "Shift enum (MORNING, EVENING, DAY, NIGHT)",
  "avatar": "String (optional)",
  "joinDate": "LocalDateTime (auto-set if not provided)",
  "lastActive": "LocalDateTime (auto-updated)",
  "permissions": "List<String> (optional)",
  "currentTask": "String (optional)"
}
```

### Role Enum
- `ADMIN`
- `MANAGER`
- `STAFF`

### StaffStatus Enum
- `ACTIVE`
- `ON_BREAK`
- `OFF_DUTY`
- `INACTIVE`

### Shift Enum
- `MORNING`
- `EVENING`
- `DAY`
- `NIGHT`

## Frontend Integration Examples

### Fetching All Staff
```javascript
const fetchStaff = async () => {
  try {
    const response = await fetch('http://localhost:8082/admin/all');
    const staff = await response.json();
    setStaffList(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
  }
};

### Adding New Staff
```javascript
const addStaff = async (staffData) => {
  try {
    const response = await fetch('http://localhost:8082/admin/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staffData),
    });
    const newStaff = await response.json();
    return newStaff;
  } catch (error) {
    console.error('Error adding staff:', error);
  }
};

### Searching Staff
```javascript
const searchStaff = async (searchTerm) => {
  try {
    const response = await fetch(`http://localhost:8082/admin/search?searchTerm=${searchTerm}`);
    const staff = await response.json();
    setFilteredStaff(staff);
  } catch (error) {
    console.error('Error searching staff:', error);
  }
};

### Getting Staff Statistics
```javascript
const fetchStaffStats = async () => {
  try {
    const response = await fetch('http://localhost:8082/admin/statistics');
    const stats = await response.json();
    setStaffStats(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200 OK`: Successful request
- `404 Not Found`: Resource not found
- `400 Bad Request`: Invalid request data
- `500 Internal Server Error`: Server error

## CORS Configuration

All endpoints are configured with `@CrossOrigin(origins = "*")` to allow frontend access from any origin.

## Database Tables

The system creates the following tables:
- `staff`: Main staff table
- `staff_permissions`: Staff permissions (many-to-many relationship)
- `admins`: Admin table (enhanced with additional fields)

## Notes

1. All timestamps are in `LocalDateTime` format
2. Staff ID is auto-generated using `@GeneratedValue(strategy = GenerationType.IDENTITY)`
3. Username and email must be unique
4. Join date is automatically set to current time if not provided
5. Last active time is automatically updated on various operations
6. Permissions are stored as a separate table for flexibility
