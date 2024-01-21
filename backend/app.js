const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Create a new Express application
const app = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up PostgreSQL connection using Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

// Verify database connection
pool.connect()
    .then(() => console.log('Connected successfully to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));

// Define a simple route for testing
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Client Management System!" });
});

// Client routes
app.get('/clients', async (req, res) => {
    try {
        const { search } = req.query;
        let query = 'SELECT * FROM clients';

        if (search) {
            query += ` WHERE name LIKE $1 OR email LIKE $1 OR phone LIKE $1`;
            const values = [`%${search}%`];
            const clientList = await pool.query(query, values);
            res.json(clientList.rows);
        } else {
            const clientList = await pool.query(query);
            res.json(clientList.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/clients', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newClient = await pool.query(
            'INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [name, email, phone]
        );
        res.json(newClient.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
