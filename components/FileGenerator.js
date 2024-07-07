// FileGenerator.js
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import * as Print from 'expo-print';

export async function createPDF(employees) {
  try {
    const html = `
      <html>
      <body>
        <h1>Employee List</h1>
        <table border="1">
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Qualification</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
          ${employees.map(employee => `
            <tr>
              <td>${employee.name}</td>
              <td>${employee.employee_id}</td>
              <td>${employee.phone}</td>
              <td>${employee.email}</td>
              <td>${employee.address}</td>
              <td>${employee.qualification}</td>
              <td>${employee.position}</td>
              <td>${employee.salary}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Share PDF' });
  } catch (error) {
    console.error('Error creating PDF:', error);
    throw error;
  }
}

export async function createCSV(employees) {
  try {
    let csvData = 'Name,Employee ID,Phone,Email,Address,Qualification,Position,Salary\n';
    employees.forEach(employee => {
      csvData += `${employee.name},${employee.employee_id},${employee.phone},${employee.email},${employee.address},${employee.qualification},${employee.position},${employee.salary}\n`;
    });

    const fileUri = `${FileSystem.documentDirectory}employees.csv`;
    await FileSystem.writeAsStringAsync(fileUri, csvData, { encoding: FileSystem.EncodingType.UTF8 });
    await shareAsync(fileUri, { mimeType: 'text/csv', dialogTitle: 'Share CSV' });
  } catch (error) {
    console.error('Error creating CSV:', error);
    throw error;
  }
}
