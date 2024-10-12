require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
// const mongoose = require('mongoose');
const app = express();
const port = 5000; // Port where the server will run

app.use(cors({
    origin: 'http://localhost:3000' // Allow requests only from React app
}));

// MongoDB connection string (replace <username>, <password>, and <database> with actual values)
const uri = process.env.MONGO_URI || "mongodb+srv://Gaurav:1234@cluster0.loefxng.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// Root route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});


app.get('/data', async (req, res) => {
    try {
        await client.connect(); // Connect to MongoDB
        const database = client.db('test2'); // Select your database
        const collection = database.collection('My collection'); // Select your collection

        // Fetch data from the collection
        const data = await collection.find({}).toArray();
        res.json(data); // Send the data as a JSON response

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

// Connect to MongoDB and start the server
async function startServer() {
    try {
        await client.connect(); // Connect to MongoDB
        console.log('Connected to MongoDB!');

        // Start the Express server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

startServer();
