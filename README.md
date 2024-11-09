Here’s a professional `README.md` for your **User Management System Backend**:

---

# User Management System (Backend)

This is the backend of the **User Management System**, built with **Node.js** and **Express**. The backend is responsible for managing user authentication (sign up, login), and profile management (view and update). The backend is connected to a **MongoDB** database to store user information securely.

## Features

- **User Authentication**:
  - **Sign Up**: Allows new users to create an account.
  - **Login**: Allows existing users to log in with their credentials and receive a JWT token for authentication.
  
- **User Profile Management**:
  - **View Profile**: Fetches the user's profile information (name, bio, profile picture).
  - **Update Profile**: Allows users to update their name, bio, and profile picture.

## Technologies Used

- **Node.js**: JavaScript runtime used for the backend.
- **Express.js**: Web framework to build the API routes.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.
- **Multer**: Middleware for handling file uploads (profile pictures).
- **Bcryptjs**: For hashing user passwords securely.

## Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- **MongoDB** database (or use a cloud provider like MongoDB Atlas)

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management-backend.git
   cd user-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file at the root of the project.
   - Add the following environment variables:
     ```
     MONGO_URI=mongodb://localhost:27017/userManagement  # MongoDB connection URL
     JWT_SECRET=your-jwt-secret-key  # Secret key for signing JWT tokens
     PORT=5000  # The port the server will run on
     ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will be running on `http://localhost:5000`.

## API Endpoints

### 1. **POST /api/auth/signup**
   - Registers a new user.
   - **Request body**:
     ```json
     {
       "email": "user@example.com",
       "password": "yourpassword",
       "name": "User Name"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User created successfully."
     }
     ```

### 2. **POST /api/auth/login**
   - Logs in an existing user and returns a JWT token.
   - **Request body**:
     ```json
     {
       "email": "user@example.com",
       "password": "yourpassword"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "your-jwt-token"
     }
     ```

### 3. **GET /api/user/profile**
   - Fetches the logged-in user's profile.
   - **Headers**:
     ```json
     {
       "Authorization": "Bearer <your-jwt-token>"
     }
     ```
   - **Response**:
     ```json
     {
       "user": {
         "name": "User Name",
         "bio": "User bio",
         "profilePicture": "/uploads/profile-picture.jpg"
       }
     }
     ```

### 4. **PUT /api/user/profile**
   - Updates the user's profile.
   - **Headers**:
     ```json
     {
       "Authorization": "Bearer <your-jwt-token>"
     }
     ```
   - **Request body** (for text fields):
     ```json
     {
       "name": "Updated Name",
       "bio": "Updated bio"
     }
     ```
   - **Request body** (for file upload):
     - Use `multipart/form-data` to send the file.
   - **Response**:
     ```json
     {
       "message": "Profile updated successfully.",
       "user": {
         "name": "Updated Name",
         "bio": "Updated bio",
         "profilePicture": "/uploads/new-profile-picture.jpg"
       }
     }
     ```

## Folder Structure

```bash
src/
├── controllers/                # Contains logic for handling requests
│   ├── authController.js       # Logic for user signup/login
│   ├── userController.js       # Logic for fetching/updating user profile
├── middlewares/                # Middleware functions
│   ├── authMiddleware.js       # Validates JWT token and user authorization
│   └── uploadMiddleware.js     # Handles file uploads
├── models/                     # MongoDB models
│   └── User.js                 # User schema for MongoDB
├── routes/                     # API route definitions
│   ├── auth.js                 # Routes for authentication (login, signup)
│   ├── user.js                 # Routes for user profile management
├── uploads/                    # Directory to store profile pictures
├── .env                        # Environment variables (Mongo URI, JWT secret)
├── app.js                      # Main application file
├── server.js                   # Server setup and route initialization
└── package.json                # Project dependencies and scripts
```

## Additional Information

### JWT Authentication

- The backend uses **JWT tokens** to authenticate users.
- After a successful login, the JWT token is sent in the response.
- For protected routes like viewing and updating the profile, you must include the token in the request headers as `Authorization: Bearer <your-jwt-token>`.

### File Uploads

- Profile pictures are uploaded using **Multer**, which stores them in the `uploads/` directory.
- The backend only accepts **JPEG, PNG, and JPG** files with a maximum size of 5MB.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Notes:
- Replace `your-username` with your actual GitHub username or repository name.
- Ensure your environment variables (like `MONGO_URI` and `JWT_SECRET`) are properly set in the `.env` file for the backend to function correctly.
- Make sure to set up the MongoDB database (locally or on a cloud service like MongoDB Atlas) before starting the server.

Let me know if you need further help!
