import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import pageRoutes from './routes/page.route.js';
import Path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import User from './models/user.model.js';

dotenv.config({ 
    path: "./.env"
 });

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

app.use(express.static(Path.join(__dirname, '../Frontend')));
app.get('/', (req, res) => {
    res.sendFile(Path.join(__dirname, '../Frontend', 'index.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
        })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });


// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.post('/signup', async (req, res) => {
    const { email, password, fullname } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with the hashed password
        const newUser = new User({ fullname, email, password: hashedPassword });
        await newUser.save();

        // (Optional) send email after signup
        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
});