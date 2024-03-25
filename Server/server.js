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

// Add Employee endpoint
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

// Endpoint to handle employee removal
app.delete('/employee/:id', (req, res) => {
  const employeeId = req.params.id;
  const { reason } = req.body;

  connection.query(
    'DELETE FROM Employees WHERE employee_id = ?',
    [employeeId],
    (err, results) => {
      if (err) {
        console.error('Error removing employee:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Employee removed successfully');
      res.status(200).json({ message: 'Employee removed successfully' });
    }
  );
});

// Route to fetch a list of employees
app.get('/api/employees', (req, res) => {
  // Construct SQL query to fetch all employees from the database
  const query = 'SELECT * FROM employees';

  // Execute the query to fetch employees from the database
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Send the fetched employees as a response
    res.json(results);
  });
});

// Get employees with search query
app.get('/employees', (req, res) => {
  let query = 'SELECT * FROM employees';
  const { search } = req.query;

  if (search) {
    query += ` WHERE Name LIKE '%${search}%' OR PhoneNumber LIKE '%${search}%' OR Position LIKE '%${search}%' OR Salary LIKE '%${search}%'`;
  }

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
