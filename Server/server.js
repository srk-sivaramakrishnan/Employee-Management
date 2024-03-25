const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shapna0327.',
  database: 'employee',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/employee', (req, res) => {
  const { name, phone, email, address, employeeId, qualification, position, salary } = req.body;
  connection.query(
    'INSERT INTO Employees (name, phone, email, address, employee_id, qualification, position, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, phone, email, address, employeeId, qualification, position, salary],
    (err, results) => {
      if (err) {
        console.error('Error inserting employee:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ message: 'Employee added successfully' });
    }
  );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
