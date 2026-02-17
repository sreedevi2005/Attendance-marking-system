const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;


// fake database
let users = [];
let attendance = [];


// REGISTER
app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const user = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(user);

    res.json({
        message: "Registration successful"
    });

});


// LOGIN
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(u =>
        u.email === email && u.password === password
    );

    if (!user) {
        return res.json({
            message: "Invalid login"
        });
    }

    res.json({
        message: "Login successful",
        userId: user.id
    });

});


// CHECK IN
app.post("/checkin", (req, res) => {

    const { userId } = req.body;

    attendance.push({
        userId,
        date: new Date().toLocaleDateString(),
        checkin: new Date().toLocaleTimeString(),
        checkout: null
    });

    res.json({
        message: "Checked In"
    });

});


// CHECK OUT
app.post("/checkout", (req, res) => {

    const { userId } = req.body;

    const record = attendance.find(a =>
        a.userId == userId && a.checkout === null
    );

    if (record) {
        record.checkout = new Date().toLocaleTimeString();
    }

    res.json({
        message: "Checked Out"
    });

});


// HISTORY
app.get("/history/:userId", (req, res) => {

    const userId = req.params.userId;

    const userAttendance = attendance.filter(a =>
        a.userId == userId
    );

    res.json(userAttendance);

});


app.listen(PORT, () => {
    console.log("Server running on http://localhost:5000");
});
