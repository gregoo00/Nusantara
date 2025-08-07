
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 8081;

app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
 }));
app.use(express.json()); // To parse JSON

// ✅ Connect MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // <- change if you set a MySQL password
  database: "nusantara"
});

db.connect(err => {
  if (err) {
    console.error("DB Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL DB");
  }
});

// ✅ SIGNUP Route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received signup data:", req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO account (username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("❌ Signup Error:", err);  // <-- tambahkan ini
        return res.status(500).json({ message: "Signup failed" });
      }

      console.log("✅ Signup Success:", result);  // <-- tambahkan ini
      return res.status(200).json({ message: "Signup successful", signupStatus: true });
    });

  } catch (error) {
    console.error("❌ Hashing error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});


// ✅ LOGIN Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM account WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Login Error:", err);
      res.status(500).json({ message: "Login failed" });
    } else if (results.length === 0) {
      res.status(401).json({ message: "User not found" });
    } else {
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.status(200).json({ message: "Login successful", user: user, loginStatus: true });
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    }
  });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
