import React, { useRef, useState } from "react";
import "./login.scss";
import { Form, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/web/view=tree");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      <div className="login-image-container">
        <Link to="/">Cota</Link>
      </div>
      <div className="login-form-container">
        <h2 className="text-center mb-4">Log In</h2>
        <br />
        <br />
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Email address"
            required
          />
          <br />
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
          <br />
          <button disabled={loading} className="login-button" type="submit">
            Login
          </button>
        </Form>
        <div className="w-100 text-center mt-2">
          <br />
          <Link to="/forgot-password" className="forgot-link">
            Forgot password ?
          </Link>
        </div>
        <div className="w-100 text-center mt-2">
          <br />
          <br />
          Need an account ? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
