import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "admin@gmail.com" && password === "admin123") {
            onLogin();
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleSubmit}>
                <h1>Mini CRM</h1>
                <p>Admin Login</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                <small>
                    Demo: admin@gmail.com / admin123
                </small>
            </form>
        </div>
    );
}

export default Login;