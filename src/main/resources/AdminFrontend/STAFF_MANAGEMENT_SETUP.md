# Staff Management Setup Guide

This guide will help you set up and test the Staff Management functionality in your Admin Dashboard.

## Prerequisites

1. **Backend Running**: Make sure your Spring Boot application is running on `http://localhost:8082`
2. **Database**: Ensure your database is properly configured and running
3. **Frontend Running**: Make sure your React frontend is running

## Backend Setup

### 1. Start the Spring Boot Application
```bash
cd /path/to/your/project
./mvnw spring-boot:run
```

### 2. Verify Backend is Running
Open your browser and navigate to:
- `http://localhost:8082/admin/all` - Should return staff data (or empty array if no data)
- `http://localhost:8082/admin/statistics` - Should return staff statistics

### 3. Sample Data
The backend will automatically populate sample data on first startup if no staff exists.

## Frontend Setup

### 1. Install Dependencies (if not already done)
```bash
cd src/main/resources/AdminFrontend
npm install
```

### 2. Start the Frontend
```bash
npm run dev
```

### 3. Navigate to Staff Management
- Open your browser to `http://localhost:5173` (or your frontend URL)
- Navigate to the Staff Management page

## Testing the Add Staff Member Functionality

### 1. Click "Add Staff Member" Button
- The button should open a modal dialog
- Fill in the required fields:
  - Full Name: e.g., "John Doe"
  - Username: e.g., "john.doe"
  - Email: e.g., "john.doe@medistore.com"
  - Phone: e.g., "077-123-4567"
  - Department: Select from dropdown
  - Role: Select from dropdown
  - Status: Select from dropdown
  - Shift: Select from dropdown
  - Password: Enter a password
  - Permissions: Select relevant permissions
  - Current Task: Optional

### 2. Submit the Form
- Click "Add Staff Member" button
- The form should submit to the backend
- The modal should close
- The new staff member should appear in the staff list

### 3. Verify the Data
- Check that the new staff member appears in the staff grid
- Verify all the information is displayed correctly
- Check that the staff statistics update

## API Endpoints Available

### Staff Management
- `GET http://localhost:8082/admin/all` - Get all staff members
- `POST http://localhost:8082/admin/add` - Add new staff member
- `GET http://localhost:8082/admin/{id}` - Get staff by ID
- `PUT http://localhost:8082/admin/update/{id}` - Update staff member
- `DELETE http://localhost:8082/admin/delete/{id}` - Delete staff member
- `GET http://localhost:8082/admin/search?searchTerm={term}` - Search staff
- `GET http://localhost:8082/admin/filter?department={dept}&status={status}&shift={shift}` - Filter staff
- `GET http://localhost:8082/admin/statistics` - Get staff statistics

### Admin Management (Enhanced)
- `GET http://localhost:8082/admin/all` - Get all admins
- `GET http://localhost:8082/admin/search?searchTerm={term}` - Search admins
- `GET http://localhost:8082/admin/department/{department}` - Get admins by department

## Troubleshooting

### Common Issues

1. **"Add Staff Member" button doesn't work**
   - Check browser console for errors
   - Verify backend is running on port 8081
   - Check CORS settings

2. **Form submission fails**
   - Check network tab in browser dev tools
   - Verify all required fields are filled
   - Check backend logs for errors

3. **Data not displaying**
   - Verify API endpoints are working
   - Check browser console for JavaScript errors
   - Verify data format matches expected structure

4. **CORS errors**
   - Backend is configured with `@CrossOrigin(origins = "*")`
   - If still having issues, check browser security settings

### Backend Logs
Check your Spring Boot console for any error messages. Common issues:
- Database connection problems
- Missing dependencies
- Port conflicts

### Frontend Logs
Check browser console (F12) for:
- Network errors
- JavaScript errors
- API response issues

## Data Structure

### Staff Object
```json
{
  "staffID": 1,
  "fullName": "John Doe",
  "username": "john.doe",
  "email": "john.doe@medistore.com",
  "phone": "077-123-4567",
  "department": "Pharmacy",
  "role": "STAFF",
  "status": "ACTIVE",
  "shift": "MORNING",
  "avatar": "/avatars/default.jpg",
  "joinDate": "2024-01-01T00:00:00",
  "lastActive": "2024-01-01T12:00:00",
  "permissions": ["inventory_view", "sales"],
  "currentTask": "Customer service"
}
```

## Features Implemented

✅ **Add Staff Member** - Modal form with validation
✅ **View All Staff** - Grid display with cards
✅ **Search Staff** - Real-time search functionality
✅ **Filter by Department** - Dropdown filtering
✅ **Staff Statistics** - Dashboard cards with counts
✅ **Status Management** - Active, On Break, Off Duty, Inactive
✅ **Shift Management** - Morning, Evening, Day, Night
✅ **Permission System** - Role-based permissions
✅ **Real-time Updates** - Auto-refresh after adding staff
✅ **Responsive Design** - Works on all screen sizes
✅ **Loading States** - User feedback during operations
✅ **Error Handling** - Graceful error handling and fallbacks

## Next Steps

1. **Edit Staff** - Implement edit functionality
2. **Delete Staff** - Add delete confirmation
3. **Bulk Operations** - Select multiple staff for operations
4. **Export Data** - Export staff data to CSV/Excel
5. **Advanced Filtering** - More filter options
6. **Staff Scheduling** - Schedule management
7. **Notifications** - Real-time notifications for staff changes

## Support

If you encounter any issues:
1. Check this guide first
2. Review the API documentation in `STAFF_API_GUIDE.md`
3. Check browser console and backend logs
4. Verify all dependencies are installed correctly
