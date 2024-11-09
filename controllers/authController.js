import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Register a new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    console.log('Request body:', req.body); // Log the incoming request

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed password:', hashedPassword);

        // Create and save the new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        console.log('User registered successfully');
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: "Server error" });
    }
};

// Login user
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: "Server error" });
    }
};

// Send OTP for email verification
export const sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Please provide an email" });
    }

    try {
        const otp = Math.floor(1000 + Math.random() * 9000);

        const user = await User.findOneAndUpdate({ email }, { otp });
        if (!user) return res.status(404).json({ message: "User not found" });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error('Error sending OTP:', err);
        res.status(500).json({ message: "Error sending OTP" });
    }
};
