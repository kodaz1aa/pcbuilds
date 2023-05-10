import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import PartSelection from "./PartSelection";
import "./PartsPicker.css";
import logo from "./pcbuildstransparent.jpg";

const PartsPicker = ({ selectedComponents, setSelectedComponents }) => {
  const [components, setComponents] = useState(selectedComponents);
  const navigate = useNavigate();

  useEffect(() => {
    setComponents(selectedComponents);
  }, [selectedComponents]);

  const removeComponent = (component) => {
    setComponents({ ...components, [component]: null });
    setSelectedComponents({ ...selectedComponents, [component]: null });
  };

  const calculateTotalPrice = () => {
    const totalPrice = Object.values(components).reduce((acc, part) => {
      return part ? acc + parseFloat(part.price) : acc;
    }, 0);
    return totalPrice.toFixed(2);
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
      <div className="parts-picker">
        <Routes>
          {Object.keys(components).map((component) => (
            <Route
              key={component}
              path={`/select/${component}`}
              element={
                <PartSelection
                  setSelectedComponents={setSelectedComponents}
                  component={component}
                  socket={components.cpu && components.cpu.socket}
                />
              }
            />
          ))}
        </Routes>
        <div className="parts-container">
          {Object.keys(components).map((component) => (
            <div key={component} className="part">
              <span className="part-title">{component.toUpperCase()}</span>
              {components[component] ? (
                <>
                  <div className="part-info">
                    <div>{components[component].name}</div>
                    <div className="part-price">
                    €{components[component].price}
                    </div>
                  </div>
                  <div className="actions">
                    <a
                      href={components[component].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="url-button"
                    >
                      Peržiūrėti prekę
                    </a>
                    <button
                      className="remove-button"
                      onClick={() => removeComponent(component)}
                    >
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <Link to={`/select/${component}`} className="add-button">
                  Add
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="total-price">Bendra kaina: €{calculateTotalPrice()}</div>
      </div>
      <footer className="App-footer">
        <p>© 2023 PC Builds. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PartsPicker;