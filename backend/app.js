import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';
import passport from 'passport';
import passportLocal from 'passport-local';
const localStrategy = passportLocal.Strategy;
import ExpressError from './utils/ExpressError.js';
import User from "./models/user.model.js";
import userRoutes from './routes/user.routes.js';
// import storesRoutes from './routes/stores.js';
// import inventoryRoutes from './routes/inventory.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express()

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Vite dev server
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Middleware
app.use(express.json()); // Add this for JSON parsing
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionOptions = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 24 * 60 * 60 * 1000,   //time in millisecond
        maxAge: 7 * 24 * 24 * 60 * 60 * 1000,
        httpOnly: true,   //to prevent XSS Attack
        secure: false, // Set to true in production with HTTPS
        sameSite: 'lax'
    },
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.send("Hello world");
})
// app.use('/api/stores', storesRoutes);
// app.use('/api/inventory', inventoryRoutes);
app.use('/api/user', userRoutes);

// app.all('*', (req, res, next) => {
//     next(new ExpressError(404, "Page not Found"));
// });

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).json({ error: message });
});

// app.listen(5000, () => console.log('Server running'));

export default app;