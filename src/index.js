import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './index.css';
import App from './App';
import PartsPicker from './PartsPicker';
import PartSelection from './PartSelection';
import UploadPage from './UploadPage'; 
import LoginPage from './LoginPage';

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedComponents, setSelectedComponents] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    cooler: null,
    gpu: null,
    storage: null,
    deze: null,
    psu: null,
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/pc-builder"
          element={
            <PartsPicker
              selectedComponents={selectedComponents}
              setSelectedComponents={setSelectedComponents}
            />
          }
        />
        <Route
          path="/select/:component"
          element={
            <PartSelection
              selectedComponents={selectedComponents}
              setSelectedComponents={setSelectedComponents}
            />
          }
        />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/upload"
          element={isAuthenticated ? <UploadPage /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);
