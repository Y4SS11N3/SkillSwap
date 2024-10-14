# SkillSwap

![SkillSwap Landing Page](docs/skillswap_home.png)

## ALX Software Engineering Program - Graduation Project

SkillSwap is a dynamic platform designed to facilitate skill exchanges between users. This project represents the culmination of my journey through the ALX Software Engineering program, showcasing my ability to create a full-stack application that addresses real-world challenges.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Acknowledgments](#acknowledgments)
- [Author](#author)

## Project Overview

As my final project in the ALX Software Engineering program, I developed SkillSwap to demonstrate proficiency in full-stack development, database management, and real-time communication implementation. This project embodies the core principles of software engineering I've learned throughout the program and showcases my ability to bring a complex application from concept to completion.

## Features

- User authentication and profile management
- Skill listing and categorization
- Skill exchange request system
- Real-time chat functionality
- Video meeting integration using Jitsi
- Dashboard with skill statistics and recent exchanges

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Socket.io for real-time communication
- JWT for authentication

### Frontend
- React.js
- Redux for state management
- Tailwind CSS for styling
- Axios for API requests
- Socket.io-client for real-time features

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:

```
git clone https://github.com/Y4SS11N3/SkillSwap.git
cd skillswap
```

2. Install backend dependencies:

```
cd backend
npm install
```

3. Set up environment variables:
   * Copy `.env.example` to `.env` and fill in your details

4. Set up the database:

```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

5. (Optional) Seed the database with demo data:

```
npx sequelize-cli db:seed:all
```

6. Install frontend dependencies:

```
cd ../frontend
npm install
```

7. Set up frontend environment variables:
   * Copy `.env.example` to `.env` and adjust as needed

## Usage

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Future Enhancements

- Implement a rating system for skill exchanges
- Add a recommendation engine for skill matches
- Integrate a calendar for scheduling skill exchange sessions

## Acknowledgments

- [ALX Software Engineering Program](https://www.alxafrica.com/) for providing the knowledge and skills necessary to build this project.
- [Jitsi](https://jitsi.org/) for their open-source video conferencing solution that I integrated into the project.

## Author

Yassine Mtejjal
- GitHub: [https://github.com/Y4SS11N3](https://github.com/Y4SS11N3)
- LinkedIn: [https://www.linkedin.com/in/yassine-mtejjal](https://www.linkedin.com/in/yassine-mtejjal)

---

This project is part of the ALX Software Engineering Program. Learn more at [https://www.alxafrica.com/](https://www.alxafrica.com/)