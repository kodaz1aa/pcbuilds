import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UploadPage.css';
import logo from './pcbuildstransparent.jpg';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        navigate('/upload');
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <nav className="App-nav">
          <Link to="/">Pagrindinis</Link>
          <Link to="/pc-builder">PC Builder</Link>
          <Link to="/apie-mus">Apie Mus</Link>
          <Link to="/kontaktai">Kontaktai</Link>
        </nav>
      </header>
      <main className="App-main">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </main>
      <footer className="App-footer">
        <p>© 2023 PC Builds. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;