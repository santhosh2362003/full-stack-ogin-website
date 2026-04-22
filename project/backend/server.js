const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/fullstackDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Register API
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

// Login API
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
