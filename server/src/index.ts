import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get('/api/cities', (req, res) => {
  pool.query('SELECT * FROM cities', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/api/cities/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM cities WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/cities', (req, res) => {
  const { cityName, country, emoji, date, notes, position } = req.body;
  const query =
    'INSERT INTO cities (cityName, country, emoji, date, notes, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [
    cityName,
    country,
    emoji,
    date,
    notes,
    position.lat,
    position.lng,
  ];

  pool.query(query, values, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const result = results as mysql.ResultSetHeader;
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
