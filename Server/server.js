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
  password: '',
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

  // Check if reason is provided
  if (!reason) {
    return res.status(400).json({ error: 'Reason is required' });
  }

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

      // Log the reason for termination
      console.log(`Employee ID: ${employeeId} is being removed for reason: ${reason}`);

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

// Route to update employee details
app.post('/api/update', (req, res) => {
  const { employee_id, name, email, phone, address, position, salary, qualification } = req.body;

  // Check if all required fields are provided
  if (!employee_id || !name || !phone || !position || !salary) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Perform the update operation in the database
  connection.query(
    'UPDATE Employees SET name = ?, email = ?, phone = ?, address = ?, position = ?, salary = ?, qualification = ? WHERE employee_id = ?',
    [name, email, phone, address, position, salary, qualification, employee_id],
    (err, results) => {
      if (err) {
        console.error('Error updating employee:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Employee details updated successfully' });
    }
  );
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

// Route to handle POST request to /api/getid
app.post('/api/getid', (req, res) => {
  const { id } = req.body;
  console.log('Received employee ID:', id);
  // You can perform further operations with the employee ID here
  res.status(200).json({ message: 'Employee ID received successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
