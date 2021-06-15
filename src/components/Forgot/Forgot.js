import React, { useRef, useState } from 'react';
import './forgot.scss';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from "react-router-dom"

function Forgot() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()

    try {
        setMessage('');
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value);
      setMessage('check your inbox for further instructions');
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <div className="forgot-container">
  
      <h2 className="text-center mb-4"> Reset email password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <br />
        <br />
        <input type="email" ref={emailRef} placeholder="Email address" required />
        <br />
        <Button disabled={loading} className="send-button" type="submit">
          Send
        </Button>
      </Form>
      <div className="w-100 text-center mt-2">
        <br />
        <br />
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  )
}

export default Forgot;
