const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1/studentsdata', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Create a student schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

// Create a student model
const Student = mongoose.model('Student', studentSchema);

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle student enrollment endpoint
app.post('/enroll', (req, res) => {
    const { name, age, email } = req.body;

    // Create a new student object
    const student = new Student({
        name: name,
        age: age,
        email: email
    });

    // Save the student object to the database
    student.save()
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error('Error saving student:', error);
            res.sendStatus(500);
        });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
