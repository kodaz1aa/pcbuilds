import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import PartsPicker from './PartsPicker';
import PartSelection from './PartSelection';
import UploadPage from './UploadPage';
import './App.css';
import logo from './pcbuildstransparent.jpg';

function App() {
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
          <Link to="/upload">Upload XML</Link>
        </nav>
      </header>
      <main className="App-main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>PC Builds</h1>
                <h2>Susirink savo svajonių kompiuterį!</h2>
                <Link to="/pc-builder" className="App-button">
                  PC Builder
                </Link>
              </>
            }
          />
          <Route path="/pc-builder" element={<PartsPicker />} />
          <Route path="/select/:component" element={<PartSelection />} />
          <Route path="/apie-mus" element={<h2>Apie Mus</h2>} />
          <Route path="/kontaktai" element={<h2>Kontaktai</h2>} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </main>
      <footer className="App-footer">
        <p>© 2023 PC Builds. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;