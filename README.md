# TodoList API

A RESTful API for managing tasks in a TodoList application with user authentication.

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **dotenv** - Environment variables
- **cors** - Cross-Origin Resource Sharing

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or higher)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas account)

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/JuanLuisCapellan1/To-Do-List.git
cd To-DoList
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your_jwt_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
NODE_ENV=development
```

Replace `your_jwt_secret_key` and `your_refresh_token_secret` with strong random strings for security.

### 4. Start MongoDB

Make sure your MongoDB server is running. If using a local installation:

```bash
# On Windows
net start MongoDB

# On macOS/Linux
mongod
```

If using MongoDB Atlas, ensure you've updated the MONGODB_URI in your .env file with your connection string.

### 5. Start the application

For development with auto-restart:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will start on the port specified in your .env file (default: 3000).

## Database Structure

The application uses two main MongoDB collections:

### Users Collection

- `name`: User's full name
- `email`: User's email (unique)
- `password`: Hashed password
- `createdAt`: Timestamp

### Tasks Collection

- `title`: Task title
- `description`: Task description
- `status`: Task status (pending, in-progress, completed)
- `priority`: Task priority (low, medium, high)
- `dueDate`: Due date for the task (optional)
- `user`: Reference to the user who created the task
- `isDeleted`: Soft delete flag
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user
- `GET /auth/account` - Get current user profile
- `POST /auth/refresh-token` - Refresh access token

### Tasks

- `POST /tasks` - Create a new task
- `GET /tasks` - Get all tasks for authenticated user
- `PUT /tasks/:id` - Update a specific task
- `DELETE /tasks/:id` - Delete a task (soft delete)

## Authentication Flow

The application uses a JWT-based authentication system with refresh tokens:

1. User registers or logs in and receives an access token and refresh token
2. Access token is short-lived (15 minutes by default) and used for API requests
3. When the access token expires, the refresh token can be used to get a new access token
4. Refresh tokens are long-lived (7 days by default)
5. All task endpoints require authentication with a valid access token

## Security Features

- Password hashing with bcrypt
- JWT for secure authentication
- Role-based access control
- Input validation
- Task ownership verification
- CORS protection

## Error Handling

The API provides detailed error messages with appropriate HTTP status codes.

## License

This project is licensed under the ISC License.
