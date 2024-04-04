const { Client } = require('pg');
const Fakerator = require("fakerator");

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

async function generateData(req, res) {
    const fakerator = Fakerator();

    for (let i = 0; i < 100; i++) {
        const name = fakerator.names.name();
        const insertVehicleSql = 'INSERT INTO names (name) VALUES ($1)';
        const values = [name];
        client.query(insertVehicleSql, values);
    }

    res.status(200).send('Names generated successfully');
}

async function saveData(req, res) {
    const names = req.body.names;
    const email = req.body.email;
    console.log({ names });
    console.log({ email });
    const userSqlQuery = 'SELECT id from users where (email) = ($1) LIMIT 1';
    const userValues = [email];
    const userIdResult = await client.query(userSqlQuery, userValues);
    const userId = userIdResult.rows[0]?.id;
    const userNameValues = [userId, names];
    const userNameQuery = 'INSERT INTO user_names (userId,names) VALUES ($1,$2)';
    await client.query(userNameQuery, userNameValues);
    res.render('show-names', { names: names });
}

module.exports = { generateData, saveData };



