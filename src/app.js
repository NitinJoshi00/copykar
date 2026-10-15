const express = require("express");
const path = require("path");
const connectDB = require("./db/db.js");

require("dotenv").config();

const app = express();
app.use(express.json());

const shareRoutes = require("./routes/share.routes.js");
app.use("/api/share", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    res.status(503).json({ message: "Database is unavailable. Please try again later." });
  }
});
app.use("/api/share", shareRoutes);

// Serve public files locally. Vercel serves the public directory from its CDN.
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// Return the frontend for browser routes
app.get(["/share/send", "/share/code/:code"], (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = app;
