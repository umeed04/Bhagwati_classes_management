# Bhagwati_classes_management

Bhagwati Classes Management System is a full-stack application that simplifies coaching institute operations by managing students, attendance, fees, courses, exams, and study materials in one platform.

# Bhagwati Classes Management System

## Overview

Bhagwati Classes Management System is a full-stack application designed to automate and simplify the management of coaching institutes. The system helps administrators manage students, teachers, courses, attendance, fees, examinations, and study materials through a centralized platform.

## Features

### Student Management

- Add, update, and delete student records
- View student profiles and enrollment details
- Manage student batches and courses

### Fee Management

- Record fee payments
- Track pending and completed payments
- Generate fee reports

### Authentication & Security

- Secure login and registration
- JWT-based authentication and authorization

## Technology Stack

### Frontend

- React.js
- Vite
- Bootstrap / CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Authentication

- JSON Web Token (JWT)

### Desktop Application

- Electron.js

### Configure Environment Variables

Create a `.env` file in the backend directory and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the Application

```bash
npm run dev
```

## Project Structure

```text
Bhagwati_Classes/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── electron/
└── package.json
```

## Future Enhancements

- Online fee payment integration
- SMS/Email notifications
- Student performance analytics
- Mobile application support
- Advanced reporting dashboard

## Author

Umeed Patel

# Scrennshot

![login](\images\login.png)
![Home](\images\home.png)
![Add student detail](AddDetail.png)
![Search student detail](\images\search_student_detail.png)
![student fee detail](images\student_feedetail.png)
