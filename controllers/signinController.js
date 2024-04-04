const { Client } = require('pg');

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

async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        // Check if user exists in the database
        const userQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2';
        const { rows } = await client.query(userQuery, [email, password]);

        if (rows.length === 0) {
            // User not found or invalid credentials
            return res.status(401).send('Invalid email or password');
        }

        // Redirect or respond accordingly after successful sign-in
        // For example:
        await renderKnowNames(req, res, email);
    } catch (error) {
        console.error('Error signing in user:', error.message);
        res.status(500).send('Error signing in user');
    }
}

async function renderKnowNames(req, res, email) {
    try {
        // Fetch names from the names table
        const fetchNamesSql = 'SELECT name,id FROM names';
        const namesResult = await client.query(fetchNamesSql);
        const names = namesResult.rows.map(row => row.name);
        console.log({ names });
        // Render the 'know-names' view and pass the names data
        res.render('know-names', { names: names, email: email });

    } catch (error) {
        console.error('Error fetching names:', error.message);
        res.status(500).send('Error fetching names');
    }
}

async function renderSignIn(req, res) {
    res.render('signin');
}

module.exports = { renderSignIn, signIn };