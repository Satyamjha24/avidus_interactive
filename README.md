## Summary
Implemented role-based authentication and user activity tracking for the Task Manager application.

## Backend Changes
- Added role field (Admin/User) to User schema
- Added status field (Active/Inactive) to User schema
- Created ActivityLog model to track user actions
- Implemented JWT-based authentication middleware
- Implemented admin-only middleware
- Created admin APIs for user management and task monitoring
- Created activity logging for login, task create, update and delete
- Added cascade delete - deleting a user also deletes their tasks
- Created analytics API for admin dashboard

## Frontend Changes
- Built role-based routing with ProtectedRoute and AdminRoute guards
- Created Admin Dashboard with user and task analytics
- Created User Management page with search, activate/deactivate and delete
- Created Task Monitoring page with search and status filter
- Created Activity Logs page with search and action filter
- Built reusable components - StatCard, TaskCard, UserTable, ActivityTable, Modal, Loader
- Implemented optimistic UI updates on all CRUD operations
- Added responsive design for all pages

## Testing
- Verified all protected routes redirect correctly based on role
- Verified admin cannot access user routes and vice versa
- Verified activity logs are created for all tracked actions
- Verified cascade delete removes user tasks on user deletion

## Admin Credentials (for testing)
Email:    admin@gmail.com
Password: 123456

## Test User (register a new one or use)
Email:    john@gmail.com
Password: 123456

## Screenshots

### Register Page
<img width="587" height="757" alt="image" src="https://github.com/user-attachments/assets/75337589-4a45-4f84-8dc1-e4e43ad737e0" />


### Login Page
<img width="824" height="848" alt="image" src="https://github.com/user-attachments/assets/15ccfd5d-fdfe-4848-ab67-cee4c31343db" />

### User Dashboard
<img width="1904" height="647" alt="image" src="https://github.com/user-attachments/assets/5a1670a3-14ad-4ea0-b0b6-ea50ef72e449" />

### User Tasks Page
<img width="1901" height="654" alt="image" src="https://github.com/user-attachments/assets/efde2f2d-dd26-4c42-bbe7-a9e3a39a2ab1" />

### Admin Dashboard
<img width="1902" height="820" alt="image" src="https://github.com/user-attachments/assets/c0a08db8-67be-49ac-b62b-cdf5d7f6bf5d" />

### User Management
<img width="1896" height="722" alt="image" src="https://github.com/user-attachments/assets/e76d2d72-4809-4058-8e24-96793a222d37" />

### Task Monitoring
<img width="1889" height="787" alt="image" src="https://github.com/user-attachments/assets/3b6ed827-7980-4258-8d4c-4f009e282c4f" />

### Activity Logs
<img width="1889" height="943" alt="image" src="https://github.com/user-attachments/assets/f8961362-3cec-4047-bf36-d8f1ac3f1557" />
