## Phase 1: Implementation Details

### Backend (Server)
- Backend code is organized inside the server folder.
- Node.js and Express.js are used to build REST APIs.
- MongoDB is connected using the Mongoose library.
- The project follows the MVC pattern:
    - Models define ticket schemas.
    - Controllers contain business logic.
    - Routes handle API requests.
- dotenv is used for environment variables.
- cors is enabled for frontend-backend communication.
- nodemon is used during development.

### Frontend (Client)
- Frontend code is placed inside the client folder.
- Built using React with Vite.
- Implemented features:
    - Ticket creation form dashboard.
    - Ticket list dashboard.
    - Navigation bar for routing.
- React Router is used for page navigation.

### Technologies and Libraries Used
    - Frontend: React, Vite, React Router
    - Backend: Node.js, Express.js
    - Database: MongoDB, Mongoose
    - Utilities: dotenv, cors, nodemon






## Rough 
- till phase2 step4
    User.js → schema, hashing, comparePassword 
    generateToken.js → clean JWT payload & expiry 
    authController.js → register + login 
    authMiddleware.js → verifyAuth + authorize 

