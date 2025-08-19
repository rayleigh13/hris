import express from "express";
import bodyParser from "body-parser";
import sequelize from "./config/database.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();

// middleware
app.use(bodyParser.json());

// routes
app.use("/api/users", userRoutes);

// database connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Error: " + err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
