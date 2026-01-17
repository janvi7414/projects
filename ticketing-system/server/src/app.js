const express = require("express");
const cors = require("cors");

const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes")

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

// here full endpoint is /api/users/me
app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


module.exports = app;
