import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UploadPage.css';
import logo from './pcbuildstransparent.jpg';

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('File upload failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('File upload failed. Please try again.');
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
        <h2>Upload XML File</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".xml" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </main>
      <footer className="App-footer">
        <p>© 2023 PC Builds. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UploadPage;