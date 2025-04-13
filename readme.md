# EduNexus - Learning Management System

A modern full-stack learning management system built with Next.js, Spring Boot, and MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- Java Development Kit (JDK) 17 or higher
- MongoDB
- Visual Studio Code

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create or update your `.env` file with necessary environment variables:

   ```
   # Add your environment variables here
   # Example:
   NEXT_PUBLIC_API_URL=http://localhost:8090/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup

1. Navigate to the Spring Boot application directory:

   ```
   cd ooadproject
   ```

2. Make sure MongoDB is running on your system

3. Build and run the Spring Boot application:

   ```
   ./mvnw spring-boot:run
   ```

   Or using Maven directly:

   ```
   mvn spring-boot:run
   ```

4. The API will be available at `http://localhost:8090/api`

## Features

### User Management

- **User Registration**: Create accounts as either a student or instructor
- **User Authentication**: Secure login with JWT authentication
- **User Profiles**: Manage personal information and preferences

### For Students

- **Course Browsing**: Explore available courses
- **Course Enrollment**: Register for courses of interest
- **Learning Dashboard**: Track progress in enrolled courses
- **Course Content Access**: View lectures, materials, and resources

### For Instructors

- **Course Creation**: Design and publish new courses
- **Course Management**: Edit course details, content, and materials
- **Student Management**: Monitor enrolled students and their progress
- **Content Upload**: Share educational materials and resources

### General Features

- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Search Functionality**: Find courses by name, category, or instructor
- **Contact & Support**: Get help and provide feedback

## Development

### VS Code Extensions

For the best development experience, install the following VS Code extensions:

- Java Extension Pack
- Spring Boot Extension Pack
- MongoDB for VS Code
- ESLint
- Prettier

### Frontend Technologies

- Next.js 15+
- React 19
- Tailwind CSS
- Framer Motion for animations
- React Hook Form with Zod validation
- React Query for data fetching

### Backend Technologies

- Spring Boot 3.4
- Spring Security with JWT
- Spring Data MongoDB
- Maven

## License

This project is licensed under the MIT License - see the LICENSE file for details.
