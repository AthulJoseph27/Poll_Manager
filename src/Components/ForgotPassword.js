import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setMessage("");
            setLoading(true);
            console.log(emailRef.current.value);
            await resetPassword(emailRef.current.value);
            setMessage("Check your email to reset your password.")
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Password Reset</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Button
                                    disabled={loading}
                                    className="w-100 mb-2 mt-4"
                                    type="submit"
                                    style={{
                                        backgroundColor: "#00BFA6",
                                        borderColor: "#00BFA6"
                                    }}>
                                    Reset Password
                                </Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link to="/login">Login</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Don't have an account? <Link to="/signUp">Sign Up</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

