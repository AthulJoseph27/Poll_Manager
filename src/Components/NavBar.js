import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function NavBar() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleLogout(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await logout();
            history.push("/");
        } catch {
            setError("Failed to Logout");
        }

        setLoading(false);
    }

    return (
        <nav className="navbar">
            <h1>Polls</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create-new-poll">New Poll</Link>
                <Link to="/active-polls">Active Polls</Link>
                <Link to="/finished-polls">Finished Polls</Link>
                {currentUser && <Button disabled={loading} type="submit" onClick={handleLogout}>
                    Logout
                </Button>}
                {!currentUser && <Link to="/login">
                    <Button disabled={loading} type="submit">
                        Login
                    </Button></Link>}
            </div>
        </nav >
    );
}
