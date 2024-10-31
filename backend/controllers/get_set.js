const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../Schema");
require('dotenv').config();


const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    try {
        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        // Generate a JWT token (if needed)
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ msg: "ok" }); 
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mathiangelina0@gmail.com',
        pass: 'afizealfkixuopwa'
      },
});

const signup = async (req, res) => {
    const { username, email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const newUser = new User({
            username,
            email,
            // You can add other fields if necessary
        });
        await newUser.save();

        // Generate confirmation token (using JWT or a simple token)
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send confirmation email
        const confirmationLink = `http://localhost:5173/confirm-email/${token}`;
        const mailOptions = {
            from: "mathiangelina0@gmail.com",
            to: email,
            subject: 'Email Confirmation',
            html: `
    <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #6a0dad; text-align: center;">Welcome to Our Service!</h1>
            <p style="font-size: 16px; color: #333333;">
                Thank you for signing up, <strong>${username}</strong>! Please confirm your email address by clicking the link below.
            </p>
            <a href="${confirmationLink}" style="display: inline-block; margin: 20px auto; padding: 10px 20px; background-color: #6a0dad; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirm Email</a>
            <p style="font-size: 14px; color: #777777; text-align: center;">
                If you did not sign up for this account, please ignore this email.
            </p>
        </div>
        <footer style="text-align: center; margin-top: 20px; padding: 10px; font-size: 12px; color: #888888;">
            &copy; ${new Date().getFullYear()}Kathavachak. All rights reserved.
        </footer>
    </div>
    `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ msg: "Error sending confirmation email" });
            }
            console.log('Email sent: ' + info.response);
            res.status(201).json({ msg: "User created successfully. Check your email to confirm." });
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};


const confirmPassword = async (req, res) => {
    const { password, confirm, token } = req.body; // Get password, confirmation, and token from request

    // Check if the passwords match
    if (password !== confirm) {
        return res.status(400).json({ msg: "Passwords do not match" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email; // Extract email from the token

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the user by email and update their password
        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true } // Returns the updated user document
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "ok" }); // Send a success response
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ msg: "Server error" });
    }
};


const changePassword = async (req, res) => {
    const { email, password, confirm, token } = req.body; // Ensure you get the email and passwords from the request

    // Check if the passwords match
    if (password !== confirm) {
        return res.status(400).json({ msg: "Passwords do not match" });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the user by email and update their password
        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true } // Returns the updated user document
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // You might want to invalidate the token here or remove it if you have a token system
        res.status(200).json({ msg: "ok" }); // Send a success response
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ msg: "Server error" });
    }
};
module.exports = { login, signup ,confirmPassword,changePassword};
