const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Database connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// API Endpoints

// 1. Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving patients');
    } else {
      res.json(results);
    }
  });
});

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving providers');
    } else {
      res.json(results);
    }
  });
});

// 3. Filter patients by first name
app.get('/patients/:first_name', (req, res) => {
  const firstName = req.params.first_name;
  const sql = 'SELECT * FROM patients WHERE first_name = ?';
  db.query(sql, [firstName], (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving patients');
    } else {
      res.json(results);
    }
  });
});

// 4. Retrieve providers by specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  const sql = 'SELECT * FROM providers WHERE provider_specialty = ?';
  db.query(sql, [specialty], (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving providers');
    } else {
      res.json(results);
    }
  });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

