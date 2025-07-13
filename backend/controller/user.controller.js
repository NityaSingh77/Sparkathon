import User from "../models/user.model.js";
import passport from "passport";

export const userSignup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        
        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ 
                error: "Missing required fields", 
                required: ["username", "email", "password"],
                received: { username, email, password: password ? "provided" : "missing" }
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ 
                error: "User already exists",
                existing: existingUser.username === username ? "username" : "email"
            });
        }

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log("User registered successfully:", registeredUser);
        res.json({ success: true, user: registeredUser });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(400).json({ 
            error: "Registration failed", 
            details: err.message,
            code: err.code
        });
    }
};