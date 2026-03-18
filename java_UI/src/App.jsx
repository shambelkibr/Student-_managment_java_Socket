import { useState } from "react";
import axios from "axios";
import "./ap.css";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const [student, setStudent] = useState({
    name: "",
    age: "",
    sex: "",
    grade: "",
  });

  const [students, setStudents] = useState([]);

  // ✅ Send to Java socket
  const sendMessage = async () => {
    const res = await axios.post("http://localhost:3001/send", {
      msg: message,
    });
    setReply(res.data.reply);
  };

  // ✅ Add student
  const addStudent = async () => {
    await axios.post("http://localhost:3001/students", student);
    alert("Student added");
  };

  // ✅ Search age > 20
  const searchAge = async () => {
    const res = await axios.get("http://localhost:3001/students/age/above/20");
    setStudents(res.data);
  };

  return (
    <div className="page-wrap">
      <main className="app-shell">
        <header className="hero">
          <p className="hero-kicker">Distributed System UI</p>
          <h1>Student Registration Console</h1>
          <p className="hero-sub">
            Register student records, test Java socket messaging, and quickly
            query age-based results.
          </p>
        </header>

        <section className="card">
          <h2>Socket Test</h2>
          <div className="input-row">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message for Java socket"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <p className="reply-box">
            {reply || "Socket reply will appear here."}
          </p>
        </section>

        <section className="card">
          <h2>Add Student</h2>
          <div className="form-grid">
            <input
              placeholder="Name"
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
            <input
              placeholder="Age"
              type="number"
              min="1"
              onChange={(e) => setStudent({ ...student, age: e.target.value })}
            />
            <input
              placeholder="Sex"
              onChange={(e) => setStudent({ ...student, sex: e.target.value })}
            />
            <input
              placeholder="Grade"
              onChange={(e) =>
                setStudent({ ...student, grade: e.target.value })
              }
            />
          </div>
          <button className="primary-btn" onClick={addStudent}>
            Add Student
          </button>
        </section>

        <section className="card">
          <div className="section-head">
            <h2>Search Age &gt; 20</h2>
            <button onClick={searchAge}>Search</button>
          </div>

          <ul className="student-list">
            {students.map((s) => (
              <li key={s.id}>
                <span>{s.name}</span>
                <span>{s.age}</span>
                <span>{s.sex}</span>
                <span>{s.grade}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
