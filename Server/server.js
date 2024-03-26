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
    'SELECT * FROM Employees WHERE employee_id = ?',
    [employeeId],
    (err, results) => {
      if (err) {
        console.error('Error checking employee:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      connection.query(
        'DELETE FROM Employees WHERE employee_id = ?',
        [employeeId],
        (err, results) => {
          if (err) {
            console.error('Error removing employee:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          console.log('Employee Terminated successfully');
          res.status(200).json({ message: 'Employee Terminated successfully' });
        }
      );
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

// Route to fetch a list of employees
app.get('/api/employees', (req, res) => {
  // Construct SQL query to fetch all employees from the database
  const query = 'SELECT * FROM employees';

  // Execute the query to fetch employees from the database
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Send the fetched employees as a response
    res.json(results);
  });
});


//Search
app.post('/api/search', (req, res) => {
  const { searchText } = req.body;

  // Check if searchText is provided
  if (!searchText) {
    return res.status(400).json({ error: 'Search text is required' });
  }

  // Construct SQL query to search for employees based on the provided search text
  const query = `SELECT * FROM Employees WHERE name LIKE '%${searchText}%' OR employee_id LIKE '%${searchText}%' 
  OR phone LIKE '%${searchText}%' OR position LIKE '%${searchText}%' OR salary LIKE '%${searchText}%'`;

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Return the results as JSON
    res.json(results);
  });
});

// Route to get the ID of the selected employee
app.get('/api/getid', (req, res) => {
  // Extract the employee ID from the query parameters
  const employeeId = req.query.id;

  // Assuming you have some logic to fetch the employee details from the database based on the ID
  // For demonstration purposes, let's just send back the received employee ID
  res.json({ employeeId });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
