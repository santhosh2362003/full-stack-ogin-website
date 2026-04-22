const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

// DB connect call
connectDB();

// Routes
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = new User({ username, password });
        await user.save();

        res.json({ message: "User Registered" });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
        res.json({ message: "Login Success" });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
app.listen(5000, () => console.log("Server running on port 5000"));
