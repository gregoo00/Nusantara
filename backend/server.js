const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 8081;

app.use(cors({
   origin: "http://localhost:8082",
   credentials: true
}));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nusantara"
});

db.connect(err => {
  if (err) {
    console.error("DB Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL DB");
  }
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO account (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("❌ Signup Error:", err);
        return res.status(500).json({ message: "Signup failed" });
      }
      return res.status(200).json({ message: "Signup successful", signupStatus: true });
    });
  } catch (error) {
    console.error("❌ Hashing error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

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

app.post("/reviews", (req, res) => {
  console.log("📩 Received review data:", req.body);
  const { restaurant_id, user_id, rating, comment } = req.body;
  const sql = "INSERT INTO reviews (restaurant_id, user_id, rating, comment) VALUES (?, ?, ?, ?)";
  db.query(sql, [parseInt(restaurant_id), user_id, rating, comment], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, restaurant_id: parseInt(restaurant_id), user_id, rating, comment });
  });
});

app.get("/reviews/:restaurant_id", (req, res) => {
  const sql = "SELECT * FROM reviews WHERE restaurant_id = ?";
  db.query(sql, [parseInt(req.params.restaurant_id)], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.delete("/reviews/:id/:user_id", (req, res) => {
  const sql = "DELETE FROM reviews WHERE id = ? AND user_id = ?";
  db.query(sql, [req.params.id, req.params.user_id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Review deleted" });
  });
});

app.put("/reviews/:id/:user_id", (req, res) => {
  const { rating, comment } = req.body;
  const sql = "UPDATE reviews SET rating = ?, comment = ? WHERE id = ? AND user_id = ?";
  db.query(sql, [rating, comment, req.params.id, req.params.user_id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Review updated" });
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
