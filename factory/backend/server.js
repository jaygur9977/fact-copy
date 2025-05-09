const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// MongoDB configuration
const uri = 'mongodb://127.0.0.1:27017/smoke';
const dbName = 'airMonitor';
const collectionName = 'sensorData';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint for sensor data (existing)
app.post('/sensor', async (req, res) => {
    const data = req.body;

    if (!data || !data.mq135_value) {
        return res.status(400).json({ error: "Invalid sensor data" });
    }

    const sensorData = {
        mq135_value: data.mq135_value,
        timestamp: new Date()
    };

    console.log(`📥 Received MQ135 value: ${sensorData.mq135_value} at ${sensorData.timestamp.toLocaleString()}`);

    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        await collection.insertOne(sensorData);
        await client.close();

        res.status(200).send('✅ Data saved to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB Error:', error);
        res.status(500).send('❌ Failed to save data');
    }
});

// NEW GET endpoint for frontend
app.get('/sensor-data', async (req, res) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Get data from last 24 hours by default
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        const data = await collection.find({
            timestamp: { $gte: twentyFourHoursAgo }
        })
        .sort({ timestamp: 1 })
        .toArray();

        await client.close();
        
        res.status(200).json(data);
    } catch (error) {
        console.error('❌ MongoDB Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});