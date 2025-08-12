import { Router } from "express";
import {registerUser} from "../controllers/auth.controller.js";
import {userResgisterValidator} from "../validators/index.js";  
import {validate} from "../middlewares/validator.middleware.js"; 
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';   


// Auth routes
const router = Router();

// router.route("/register")
// .post(userResgisterValidator(), validate, registerUser); // Register a new user
router.post("/register", userResgisterValidator, validate, registerUser);

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Optionally, create a session or send a token
        res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed' });
    }
});

export default router;