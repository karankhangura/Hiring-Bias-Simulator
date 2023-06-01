import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === '123') {
      setAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  if (authenticated) {
    return <Navigate to="/adminpage" />;
  } else {
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <div className="input-container">
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className="login-button">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
