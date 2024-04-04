const { Client } = require('pg');
const path = require('path');

const client = new Client({
    connectionString: 'postgresql://turnover_owner:KDUzYpo1bBf5@ep-proud-water-a58xrlrl.us-east-2.aws.neon.tech/turnover?sslmode=require',
    ssl: {
        rejectUnauthorized: false // Only include this line if you encounter SSL connection issues, not recommended for production
    }
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch(error => {
        console.error('Error connecting to PostgreSQL database:', error.message);
    });

async function signUp(req, res) {
    const { name, email, password } = req.body;
    const otp = '12345';
    const email_verified = false;

    try {
        // Create users table if it doesn't exist
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                otp VARCHAR(255) NOT NULL,
                email_verified BOOLEAN DEFAULT false
            )
        `;
        await client.query(createTableSql);

        // Insert user data into the database
        const insertUserSql = 'INSERT INTO users (name, email, password, otp, email_verified) VALUES ($1, $2, $3, $4, $5)';
        const values = [name, email, password, otp, email_verified];
        await client.query(insertUserSql, values);

        // Redirect after sending response
        res.redirect(`/verify?email=${email}`);
    } catch (error) {
        console.error('Error signing up user:', error.message);
        res.status(500).send('Error signing up user');
    }
}

async function renderSignUp(req, res) {
    res.render('signup');
}

module.exports = { signUp, renderSignUp };
