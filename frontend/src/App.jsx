import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("loggedIn") === "true"
    );

    const handleLogin = () => {
        localStorage.setItem("loggedIn", "true");
        setLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        setLoggedIn(false);
    };

    if (!loggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Dashboard onLogout={handleLogout} />
    );
}

export default App;