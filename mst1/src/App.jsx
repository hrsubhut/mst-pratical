import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Simulated JWT Token Generation
  const generateToken = (userId, role) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));

    const payload = btoa(
      JSON.stringify({
        userId: userId,
        role: role,
      })
    );

    const signature = btoa("simulated-signature");

    return `${header}.${payload}.${signature}`;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo credentials
    if (username === "admin" && password === "1234") {
      const userId = "USER101";
      const userRole = "Admin";

      const newToken = generateToken(userId, userRole);

      // Store token
      localStorage.setItem("token", newToken);
      localStorage.setItem("role", userRole);

      setToken(newToken);
      setRole(userRole);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
    setUsername("");
    setPassword("");
  };

  // Protected UI
  if (token) {
    return (
      <div className="container">
        <div className="dashboard">
          <h1>Protected Dashboard</h1>

          <h2>Welcome, {username || "Admin"}!</h2>

          <p>
            <strong>Role:</strong> {role}
          </p>

          <p>
            <strong>Token:</strong>
          </p>

          <div className="token">
            {token}
          </div>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-box">
        <h1>Login System</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Demo Login: <strong>admin / 1234</strong>
        </p>
      </div>
    </div>
  );
}

export default App;