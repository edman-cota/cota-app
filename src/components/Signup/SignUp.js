import React, { useRef, useState } from 'react'
import './signup.scss';
import { Form, Alert } from 'react-bootstrap'; 
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom"

function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/web")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div className="register-container">
      <div className="register-image-container">
      </div>
      <div className="register-form-container">
        <h2 className="text-center mb-4">Sign Up</h2>
        <br />
        <br />
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <input type="email" id="email" ref={emailRef} placeholder="Email address" required />
          <br />
          <input type="password" id="password" ref={passwordRef} placeholder="Password" required />
          <br />
          <input type="password" id="password" ref={passwordConfirmRef} placeholder="Confirm password" required />
          <br />
          <button disabled={loading} className="register-button" type="submit">
            Sign Up
          </button>
        </Form>
        <div className="w-100 text-center mt-2">
        <br />
        <br />
          Already have an account ? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp;