// const http = require('http');
// const fs = require('fs');
// const qs = require('querystring');
// const mongoose = require('mongoose');
// 
// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1/foodybase', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));
// 
// Define a schema for the form data
// const formDataSchema = new mongoose.Schema({
// name: String,
// address: String,
// number: String,
// email: String,
// fooditem: String
// });
// 
// Create a model based on the schema
// const FormData = mongoose.model('FormData', formDataSchema);
// 
// Create the server
// const server = http.createServer((req, res) => {
// if (req.method === 'GET' && req.url === '/') {
// serveForm(req, res);
// } else if (req.method === 'POST' && req.url === '/save-data') {
// handleFormSubmission(req, res);
// } else {
// res.statusCode = 404;
// res.end('404 - Not Found');
// }
// });
// 
// Serve the form
// function serveForm(req, res) {
// fs.readFile('form.html', 'utf-8', (err, content) => {
// if (err) {
// res.statusCode = 500;
// res.end('Internal Server Error');
// } else {
// res.statusCode = 200;
// res.setHeader('Content-Type', 'text/html');
// res.end(content);
// }
// });
// }
// function serveThanksPage(req, res) {
// res.statusCode = 302; // Found/Redirect status code
// res.setHeader('Location', '/thanks.html');
// res.end();
// }
// Handle form submission
// function handleFormSubmission(req, res) {
// let body = '';
// req.on('data', (chunk) => {
// body += chunk.toString();
// });
// 
// req.on('end', () => {
// const formData = qs.parse(body);
// 
// Save form data to MongoDB
// const newFormData = new FormData({
// name: formData.name,
// address: formData.address,
// number: formData.number,
// email: formData.email,
// fooditem: formData.fooditem
// });
// 
// newFormData.save()
// .then(() => {
// Write form data to a file
// const formDataString = JSON.stringify(formData) + '\n';
// fs.appendFile('C:/Users/DELL/Desktop/WP project/project/public/form-data.txt', formDataString, (err) => {
// if (err) {
// console.error('Error:', err);
// } else {
// console.log('Data saved to text file');
// 
// }
// serveThanksPage(req, res);
// });
// 
// res.statusCode = 200;
// res.setHeader('Location', '/thanks.html');
// res.end('Data saved successfully');
// res.statusCode = 302; // Found/Redirect status code
// res.setHeader('Location', 'C:/Users/DELL/Desktop/WP project/project/public/thanks.html');
// res.end();
// console.log('Form data saved to MongoDB');
// })
// .catch((err) => {
// res.statusCode = 500;
// res.end('Internal Server Error');
// console.error('Error saving form data to MongoDB:', err);
// });
// });
// }
// 
// Start the server
// const port = 3000;
// server.listen(port, () => {
// console.log(`Form Server is running on port ${port}`);
// });
// 
const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/foodybase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a schema for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  address: String,
  number: String,
  email: String,
  fooditem: String
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);

// Create the server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    serveForm(req, res);
  } else if (req.method === 'POST' && req.url === '/save-data') {
    handleFormSubmission(req, res);
  } else {
    res.statusCode = 404;
    res.end('404 - Not Found');
  }
});

// Serve the form
function serveForm(req, res) {
  fs.readFile('form.html', 'utf-8', (err, content) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    }
  });
}

// Serve the thanks page
function serveThanksPage(req, res) {
  fs.readFile('thanks.html', 'utf-8', (err, content) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    }
  });
}

// Handle form submission
function handleFormSubmission(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const formData = qs.parse(body);

    // Save form data to MongoDB
    const newFormData = new FormData({
      name: formData.name,
      address: formData.address,
      number: formData.number,
      email: formData.email,
      fooditem: formData.fooditem
    });

    newFormData.save()
      .then(() => {
        console.log('Form data saved to MongoDB');

        // Write form data to a text file
        const formDataString = JSON.stringify(formData) + '\n';
        fs.appendFile('form-data.txt', formDataString, (err) => {
          if (err) {
            console.error('Error saving form data to text file:', err);
          } else {
            console.log('Data saved to text file');
          }
        });

        serveThanksPage(req, res); // Serve the thanks page
      })
      .catch((err) => {
        console.error('Error saving form data to MongoDB:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
  });
}

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Form Server is running on port ${port}`);
});
