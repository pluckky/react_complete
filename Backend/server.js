import express from "express";
import cors from "cors";
import session from "express-session";
import initWebRoutes from "./routes/web.js";

const app = express();

// CORS configuration to allow requests from frontend (localhost:5173)
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
};

// Use CORS middleware
app.use(cors(corsOptions));

// Session middleware
app.use(
  session({
    secret: "your-secret-key", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Increase payload size limit
app.use(express.json({ limit: "10mb" })); // Increase to 10MB or your preferred size
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Increase to 10MB or your preferred size

// Session-based API to get current user info
app.get("/api/session", (req, res) => {
  if (req.session && req.session.accountType) {
    return res.json({
      email: req.session.email,
      accountType: req.session.accountType,
      name: req.session.name,
      parkVehicle: req.session.vehicle,
    });
  } else {
    return res.status(401).json({ message: "User not logged in" });
  }
});

// Initialize all routes
initWebRoutes(app);

// Start server
let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
