# Turnover App

It is a simple web application built with Node.js, Express, and PostgreSQL. It allows users to sign up and verify their email addresses using a one-time password (OTP).

## Features

- User sign up with name, email, and password
- Email verification using OTP
- PostgreSQL database integration

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/turnover-app.git
Install dependencies:

bash
Copy code
cd turnover-app
npm install
Set up PostgreSQL database:

Create a PostgreSQL database and note down the connection URL.
Set up the required environment variables:
bash
Copy code
export DATABASE_URL=your_postgresql_connection_url
Start the server:

bash
Copy code
npm start
Open your web browser and visit http://localhost:3000 to use the application.

Usage
Navigate to the home page and sign up with your name, email, and password.
Check your email for the OTP (for now it is hardcoded as 12345678).
Enter the OTP on the verification page to verify your email address.
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or create a pull request.

Fork the repository.
Create a new branch: git checkout -b feature/your-feature.
Make your changes and commit them: git commit -m 'Add your feature'.
Push to the branch: git push origin feature/your-feature.
Submit a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Express.js
Node.js
PostgreSQL
