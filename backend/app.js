require("dotenv").config({
  path: __dirname + "/.env",
});

console.log("JWT SECRET:", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");

const connectMongo = require("./config/db");

connectMongo();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const router = require("./Router/router");
const authRoutes = require("./Router/authRoutes");

app.use("/", authRoutes);
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});