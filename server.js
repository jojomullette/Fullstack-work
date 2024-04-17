
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Define API endpoints
app.get('/api/data', (req, res) => {
  db.all('SELECT * FROM your_table', (err, rows) => {
    if (err) {
      console.error('Error querying database:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});