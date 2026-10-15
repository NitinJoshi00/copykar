const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(express.json());

const shareRoutes = require("./routes/share.routes.js");
app.use("/api/share", shareRoutes);

// Serve frontend/index.html and its static files
const frontendPath = path.join(__dirname, "../../frontend");
app.use(express.static(frontendPath));

// Return the frontend for browser routes
app.get(["/share/send", "/share/code/:code"], (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;