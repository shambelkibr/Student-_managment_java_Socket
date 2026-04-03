const express = require("express");
const cors = require("cors");
const net = require("net");
const mysql = require("mysql2");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL connection

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL Connected");
});

// ✅ Socket → Java
app.post("/send", (req, res) => {
  const client = new net.Socket();

  client.connect(5000, "localhost", () => {
    client.write(req.body.msg + "\n");
  });

  client.on("data", (data) => {
    res.json({ reply: data.toString() });
    client.destroy();
  });
});


// ✅ Add student
app.post("/students", (req, res) => {
  const { name, age, sex, grade } = req.body;

  const sql =
    "INSERT INTO Student_information (name, age, sex, grade) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, age, sex, grade], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student added" });
  });
});

// ✅ Search by sex
app.get("/students/sex/:sex", (req, res) => {
  db.query(
    "SELECT * FROM Student_information WHERE sex = ?",
    [req.params.sex],
    (err, result) => res.json(result),
  );
});

// ✅ Age > value
app.get("/students/age/above/:age", (req, res) => {
  db.query(
    "SELECT * FROM Student_information WHERE age > ?",
    [req.params.age],
    (err, result) => res.json(result),
  );
});

// ✅ Grade filter
app.get("/students/grade/:grade", (req, res) => {
  db.query(
    "SELECT * FROM Student_information WHERE grade = ?",
    [req.params.grade],
    (err, result) => res.json(result),
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

