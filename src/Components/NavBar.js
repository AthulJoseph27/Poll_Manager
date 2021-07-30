import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function NavBar(props) {
    const showLoginButton = props.showLoginButton == null ? true : false;
    const { currentUser, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleLogout(e) {
        e.preventDefault();

        try {
            setLoading(true);
            await logout();
            history.push("/");
        } catch {
            console.log("Failed to logout");
        }

        setLoading(false);
    }

    return (
        <nav className="navbar">
            <Link to="/">
                <h1>BlitzPolls</h1>
            </Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create-new-poll">New Poll</Link>
                <Link to="/active-polls">Active Polls</Link>
                <Link to="/finished-polls">Finished Polls</Link>
            </div>
            <div>
                {currentUser && (showLoginButton) &&
                    <Button
                        variant="primary"
                        size="sm"
                        style={{ backgroundColor: "#00BFA6", borderColor: "#00BFA6" }}
                        disabled={loading}
                        type="submit"
                        onClick={handleLogout}>
                        Logout
                    </Button>}
                {!currentUser && (showLoginButton) && < Link to="/login">
                    <Button
                        variant="primary"
                        size="sm"
                        style={{ backgroundColor: "#00BFA6", borderColor: "#00BFA6" }}
                        disabled={loading}
                        type="submit">
                        Login
                    </Button></Link>}
            </div>
        </nav >
    );
}
