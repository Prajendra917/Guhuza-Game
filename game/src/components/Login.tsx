import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, LoginResponse } from "../api/mockApi"
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleCheckboxChange = () => {
    setRememberMe((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response: LoginResponse = await login(formData.username, formData.password);
      if (response.success) {
        if (rememberMe) {
          localStorage.setItem("username", formData.username);
        }
        navigate("/dashboard");
      } else {
        setError(response.message || "Invalid username or password");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center vh-100"
      /*style=
      {{
        backgroundImage: 'URL("https://th.bing.com/th/id/OIP.B9OY8ozIyiCT5-cWAWX6LgHaBx?rs=1&pid=ImgDetMain")',
        backgroundPosition: "center",
        backgroundSize:"contain",
        minHeight: "100vh",
        padding: 1,
        margin: 0,
        backgroundRepeat:"no-repeat"
      }}*/
      >
        <Card className="p-4 shadow" style={{ width: "90%", maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="rememberMe">
                <Form.Check type="checkbox" label="Remember Me" checked={rememberMe} onChange={handleCheckboxChange} />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading} className="w-100">
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" /> : "Login"}
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
