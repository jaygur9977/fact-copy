
// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const http = require('http');
// // const WebSocket = require('ws');

// // const app = express();
// // const server = http.createServer(app);
// // const wss = new WebSocket.Server({ server });

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // MongoDB connection
// // mongoose.connect(process.env.MONGODB_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// // .then(() => console.log('Connected to MongoDB'))
// // .catch(err => console.error('MongoDB connection error:', err));

// // // Sensor Data Schema
// // const sensorDataSchema = new mongoose.Schema({
// //   temperature: Number,
// //   motion: Boolean,
// //   timestamp: { type: Date, default: Date.now }
// // });
// // const SensorData = mongoose.model('SensorData', sensorDataSchema);

// // // API Routes
// // app.post('/api/sensor-data', async (req, res) => {
// //   try {
// //     const { temperature, motion } = req.body;
// //     const newData = new SensorData({ temperature, motion });
// //     await newData.save();
    
// //     // Broadcast to all WebSocket clients
// //     wss.clients.forEach(client => {
// //       if (client.readyState === WebSocket.OPEN) {
// //         client.send(JSON.stringify({
// //           type: 'update',
// //           data: { temperature, motion }
// //         }));
// //       }
// //     });
    
// //     res.status(201).json(newData);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // app.get('/api/sensor-data', async (req, res) => {
// //   try {
// //     const data = await SensorData.find().sort({ timestamp: -1 }).limit(50);
// //     res.json(data);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // WebSocket connection
// // wss.on('connection', (ws) => {
// //   console.log('New WebSocket client connected');
  
// //   ws.on('close', () => {
// //     console.log('Client disconnected');
// //   });
// // });

// // const PORT = process.env.PORT || 5000;
// // server.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });







// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const mongoose = require('mongoose');

// // Replace with your local MongoDB or Atlas string
// mongoose.connect('mongodb://127.0.0.1:27017/smoke', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const SmokeSchema = new mongoose.Schema({
//   zone: String,
//   ppm: Number,
//   timestamp: { type: Date, default: Date.now },
// });

// const SmokeData = mongoose.model('SmokeData', SmokeSchema);

// // Update your COM port here
// const port = new SerialPort({
//   path: 'COM3', // 🟡 Change this to your Arduino COM port
//   baudRate: 9600,
// });

// const parser = port.pipe(new Readline({ delimiter: '\n' }));

// parser.on('data', async (line) => {
//   const ppm = parseInt(line.trim());
//   if (!isNaN(ppm)) {
//     console.log("Received PPM:", ppm);
//     const data = new SmokeData({ zone: "Bhopal", ppm });
//     await data.save();
//     console.log("Saved to MongoDB ✅");
//   }
// });



// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// MongoDB Atlas URI (Replace with your credentials)
const uri = 'mongodb://127.0.0.1:27017/smoke';
const dbName = 'airMonitor';
const collectionName = 'sensorData';

app.use(bodyParser.json());

app.post('/sensor', async (req, res) => {
    const data = req.body;

    if (!data || !data.mq135_value) {
        return res.status(400).json({ error: "Invalid sensor data" });
    }

    // Add timestamp for each entry
    const sensorData = {
        mq135_value: data.mq135_value,
        timestamp: new Date()
    };

    // Print live update
    console.log(`📥 Received MQ135 value: ${sensorData.mq135_value} at ${sensorData.timestamp.toLocaleString()}`);

    try {
        // Connect to MongoDB
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert data
        await collection.insertOne(sensorData);

        // Close connection
        await client.close();

        res.status(200).send('✅ Data saved to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB Error:', error);
        res.status(500).send('❌ Failed to save data');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});









// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/smoke', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// // User Schema
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   createdAt: { type: Date, default: Date.now }
// });
// const User = mongoose.model('User', UserSchema);

// // Middleware
// app.use(cors({ 
//   origin: 'http://localhost:5173', 
//   credentials: true 
// }));
// app.use(express.json());
// app.use(cookieParser());

// // Session storage (in production, use Redis or database sessions)
// let sessions = {};

// // Session middleware
// const checkAuth = (req, res, next) => {
//   const sessionId = req.cookies.sessionId;
//   if (!sessionId || !sessions[sessionId]) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   req.user = sessions[sessionId];
//   next();
// };

// // Auth Routes
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     // Basic validation
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
    
//     const user = await User.create({ name, email, password });
//     const sessionId = Date.now().toString();
//     sessions[sessionId] = user;
    
//     res.cookie('sessionId', sessionId, { 
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });
    
//     res.json({ 
//       user: { 
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         createdAt: user.createdAt
//       } 
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }
    
//     const user = await User.findOne({ email });
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     const sessionId = Date.now().toString();
//     sessions[sessionId] = user;
    
//     res.cookie('sessionId', sessionId, { 
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });
    
//     res.json({ 
//       user: { 
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         createdAt: user.createdAt
//       } 
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.get('/api/auth/user', (req, res) => {
//   const sessionId = req.cookies.sessionId;
//   const user = sessions[sessionId];
  
//   if (!user) {
//     return res.status(401).json({ message: 'Not authenticated' });
//   }
  
//   res.json({ 
//     user: { 
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       createdAt: user.createdAt
//     } 
//   });
// });

// app.post('/api/auth/logout', (req, res) => {
//   const sessionId = req.cookies.sessionId;
//   delete sessions[sessionId];
//   res.clearCookie('sessionId');
//   res.sendStatus(200);
// });

// // Protected Routes (require authentication)
// app.get('/api/dashboard', checkAuth, (req, res) => {
//   res.json({ 
//     message: 'Dashboard data',
//     user: req.user
//   });
// });

// app.get('/api/profile', checkAuth, (req, res) => {
//   res.json({ 
//     message: 'Profile data',
//     user: req.user
//   });
// });

// app.get('/api/settings', checkAuth, (req, res) => {
//   res.json({ 
//     message: 'Settings data',
//     user: req.user
//   });
// });

// // Public Routes
// app.get('/api/factory', (req, res) => {
//   res.json({ message: 'Factory page data' });
// });

// app.get('/api/contact', (req, res) => {
//   res.json({ message: 'Contact us page data' });
// });

// app.get('/api/suggestion', (req, res) => {
//   res.json({ message: 'Suggestion page data' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something broke!' });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));