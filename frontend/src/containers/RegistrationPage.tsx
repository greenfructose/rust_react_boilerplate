import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const RegistrationPage = () => {
  const auth = useAuth()
  const history = useHistory()
  const [first_name, setFirstName] = useState<string>('')
  const [last_name, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [processing, setProcessing] = useState<boolean>(false)

  const register = async () => {
    setProcessing(true)
    const response = (
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email, password }),
      })
    ).json()
    console.log(response)
    setProcessing(false)
    history.push('/activate')
  }

  return (
    <div className="Form" style={{ textAlign: 'left' }}>
      <h1>Registration</h1>
      <br />
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <label>First Name</label>
        <input value={first_name} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <label>Last Name</label>
        <input value={last_name} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <button disabled={processing} onClick={register}>
          Register
        </button>
      </div>
      <a
        className="App-link"
        style={{ marginTop: '30px' }}
        href="#"
        onClick={() => history.push('/login')}
      >
        Already have an account? Click here to login.
      </a>
      <a
        className="App-link"
        style={{ marginTop: '30px' }}
        href="#"
        onClick={() => history.push('/activate')}
      >
        Need to activate your account? Click here.
      </a>
    </div>
  )
}
