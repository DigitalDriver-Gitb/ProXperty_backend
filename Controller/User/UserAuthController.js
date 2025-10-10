
import express from "express";
import registerModel from "../../models/Users/UserRegisterModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// ====================== REGISTER ======================
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console
        if (!name || !email || !password ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await registerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await registerModel.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.token = token;
        await user.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ====================== LOGIN ======================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        user.token = token;
        await user.save();

        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ====================== LOGOUT ======================
router.post("/logout", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.token = null;
        await user.save();

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ====================== DELETE ======================
router.post("/delete", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ====================== RESET PASSWORD ======================
router.post("/reset_password", async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        // Validate input
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Find user
        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update user's password and generate new token
        user.password = hashedPassword;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.token = token;
        
        await user.save();

        // In a real application, you would send an email with the reset link
        // containing the token, rather than returning it in the response

        res.status(200).json({ 
            success: true,
            message: "Password reset successful",
            token // In production, don't send the token in the response
        });
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ 
            success: false,
            message: "Error resetting password",
            error: error.message 
        });
    }
});

export default router;
