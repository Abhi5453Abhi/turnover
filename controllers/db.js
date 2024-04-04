const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://turnover_owner:KDUzYpo1bBf5@ep-proud-water-a58xrlrl.us-east-2.aws.neon.tech/turnover?sslmode=require',
    ssl: {
        rejectUnauthorized: false // Only include this line if you encounter SSL connection issues, not recommended for production
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Error connecting to PostgreSQL database:', error.message);
    }
}

async function closeDatabaseConnection() {
    try {
        await client.end();
        console.log('Connection to PostgreSQL database closed');
    } catch (error) {
        console.error('Error closing connection to PostgreSQL database:', error.message);
    }
}

module.exports = { client, connectToDatabase, closeDatabaseConnection };
