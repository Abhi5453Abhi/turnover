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

async function getVerify(req, res) {
    const email = req.query.email; // Extract email from query parameters
    res.render('verify', { email: email });
}

async function verify(req, res) {
    const { email, otp } = req.body;

    console.log({ otp });

    try {
        // Check if OTP matches the one stored in the database
        const checkOtpSql = `SELECT * FROM users WHERE email = $1 and otp = $2`;
        const { rows } = await client.query(checkOtpSql, [email, otp]);

        if (rows.length > 0) {
            // Update user's email as verified in the database
            const updateUserSql = 'UPDATE users SET email_verified = true WHERE email = $1';
            await client.query(updateUserSql, [email]);
            console.log('Email verified successfully');
            await renderKnowNames(req, res, email);
        } else {
            // Incorrect OTP
            res.status(400).send('Incorrect OTP');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
        res.status(500).send('Error verifying OTP');
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

module.exports = { verify, getVerify };
