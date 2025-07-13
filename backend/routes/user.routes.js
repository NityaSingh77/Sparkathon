import express from "express";
import User from "../models/user.model.js";
import passport from "passport";
import { userSignup } from "../controller/user.controller.js";

const router = express.Router();

router.get("/signup", (req, res) => {
    res.json({ message: "Signup page" });
});

// router.post("/signup", wrapAsync(async (req, res) => {
//     try {
//         let { username, email, password } = req.body;
        
//         // Validate required fields
//         if (!username || !email || !password) {
//             return res.status(400).json({ 
//                 error: "Missing required fields", 
//                 required: ["username", "email", "password"],
//                 received: { username, email, password: password ? "provided" : "missing" }
//             });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//         if (existingUser) {
//             return res.status(400).json({ 
//                 error: "User already exists",
//                 existing: existingUser.username === username ? "username" : "email"
//             });
//         }

//         const newUser = new User({ email, username });
//         const registeredUser = await User.register(newUser, password);
//         console.log("User registered successfully:", registeredUser);
//         res.json({ success: true, user: registeredUser });
//     } catch (err) {
//         console.error("Registration error:", err);
//         res.status(400).json({ 
//             error: "Registration failed", 
//             details: err.message,
//             code: err.code
//         });
//     }
// }));

router.post("/signup", userSignup);

router.get("/login", (req, res) => {
    res.json({ message: "Login page" });
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), async (req, res) => {
    res.json({ success: true, user: req.user });
});

// Check if user is authenticated
router.get("/check-auth", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ 
            authenticated: true, 
            user: req.user 
        });
    } else {
        res.status(401).json({ 
            authenticated: false, 
            message: "Not authenticated" 
        });
    }
});

// Logout route
router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ success: true, message: "Logged out successfully" });
    });
});

export default router;