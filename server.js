require("dotenv").config();

console.log("Mongo URI:", process.env.MONGO_URI);
const express = require("express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = process.env.PORT || 3000;


// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json());


// Routes
app.use("/users", userRoutes);


// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Task 5 Users API is running"
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});