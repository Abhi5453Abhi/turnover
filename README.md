# Turnover App

It is a simple web application built with Node.js, Express, and PostgreSQL. It allows users to sign up and verify their email addresses using a one-time password (OTP).

## Features

- User sign up with name, email, and password
- Email verification using OTP
- PostgreSQL database integration

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhi5453Abhi/turnover-app.git
2. **Install dependencies:**

   ```bash
   cd turnover-app
   npm install
3. **Set up PostgreSQL database:**

   Create a PostgreSQL database and note down the connection URL.

   Set up the required environment variables:
   ```bash
   export DATABASE_URL=your_postgresql_connection_url
4. **Start the server:**

   ```bash
   npm start
Open your web browser and visit http://localhost:3000 to use the application.

## Usage
Navigate to the home page and sign up with your name, email, and password.
Check your email for the OTP (for now it is hardcoded as 12345678).
Enter the OTP on the verification page to verify your email address.

## Fork the repository.
Create a new branch: git checkout -b feature/your-feature.

Make your changes and commit them: git commit -m 'Add your feature'.

Push to the branch: git push origin feature/your-feature.

Submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
   [Express.js](https://expressjs.com/)
   [Node.js](https://nodejs.org/)
   [PostgreSQL](https://www.postgresql.org/)
