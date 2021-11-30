import { useAuth, useAuthCheck } from './hooks/useAuth'
  import { AccountPage } from './containers/AccountPage'
  import { LoginPage } from './containers/LoginPage'
  import { ActivationPage } from './containers/ActivationPage'
  import { RegistrationPage } from './containers/RegistrationPage'
  import { RecoveryPage } from './containers/RecoveryPage'
  import { ResetPage } from './containers/ResetPage'    
    
import React from 'react'
import './App.css'
import { Home } from './containers/Home'
import { Todos } from './containers/Todo'
import { Route, useHistory } from 'react-router-dom'

const App = () => {
  useAuthCheck()
  const auth = useAuth()
    
  const history = useHistory()
  /* CRA: app hooks */
  
  return (
    <div className="App">
      <div className="App-nav-header">
        <div style={{ display: 'flex', flex: 1 }}>
          <a className="NavButton" onClick={() => history.push('/')}>Home</a>
          <a className="NavButton" onClick={() => history.push('/todos')}>Todos</a>
          {/* CRA: left-aligned nav buttons */}
          <a className="NavButton" onClick={() => history.push('/account')}>Account</a>
    
        </div>
        <div>
          {/* CRA: right-aligned nav buttons */}
          { auth.isAuthenticated && <a className="NavButton" onClick={() => auth.logout()}>Logout</a> }
          { !auth.isAuthenticated && <a className="NavButton" onClick={() => history.push('/login')}>Login/Register</a> }
    
        </div>
      </div>
      <div style={{ margin: '0 auto', maxWidth: '800px' }}>
        <Route path="/" exact><Home /></Route>
        <Route path="/todos"><Todos /></Route>
        {/* CRA: routes */}
        <Route path="/login"><LoginPage /></Route>
        <Route path="/recovery"><RecoveryPage /></Route>
        <Route path="/reset"><ResetPage /></Route>
        <Route path="/activate"><ActivationPage /></Route>
        <Route path="/register"><RegistrationPage /></Route>
        <Route path="/account"><AccountPage /></Route>
    
      </div>
    </div>
  )
}

export default App
