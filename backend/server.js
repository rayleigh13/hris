import express from "express";
import sequelize from "./src/config/database.js";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./src/routes/userRoutes.js";

const app = express();

// CORS configuration to allow frontend requests
const allowedOrigins = [
    'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or CURL requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Allow credentials such as cookies to be sent
}));

// ✅ JSON parser
app.use(express.json());


dotenv.config();

// routes
app.use("/api/users", userRoutes);

// database connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Error: " + err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});