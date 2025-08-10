// server.js - Node + Express backend jo public/ se static files serve karta hai
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // public/index.html serve karega

// MySQL pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'userpass',
  database: process.env.DB_NAME || 'tododb',
  waitForConnections: true,
  connectionLimit: 10
});

// table create karenge agar na ho to
// db.query(
//   `CREATE TABLE IF NOT EXISTS todos (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     task VARCHAR(255) NOT NULL,
//     completed BOOLEAN DEFAULT FALSE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   )`,
//   (err) => {
//     if (err) {
//       console.error('Error creating table:', err);
//       process.exit(1);
//     }
//     console.log('✅ todos table ready');
//   }
// );

function ensureTable() {
    db.query(
      `CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error('MySQL not ready, retrying in 5s...', err.message);
          return setTimeout(ensureTable, 5000); // retry after 5 sec
        }
        console.log('✅ todos table ready');
      }
    );
  }
  
  ensureTable(); // ⬅️ CHANGED (call retry function instead of direct query)

// READ - get all todos
app.get('/api/todos', (req, res) => {
  db.query('SELECT * FROM todos ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// CREATE
app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'task required' });
  db.query('INSERT INTO todos (task) VALUES (?)', [task], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    db.query('SELECT * FROM todos WHERE id = ?', [result.insertId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(rows[0]);
    });
  });
});

// UPDATE
app.put('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const { task, completed } = req.body;
  db.query('UPDATE todos SET task = ?, completed = ? WHERE id = ?', [task, completed ? 1 : 0, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'updated' });
  });
});

// DELETE
app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'deleted' });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
