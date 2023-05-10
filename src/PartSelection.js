import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./PartSelection.css";
import logo from "./pcbuildstransparent.jpg";

const PartSelection = ({
  selectedComponents,
  setSelectedComponents,
  socket,
}) => {
  const [parts, setParts] = useState([]);
  const { component } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const [sortOrder, setSortOrder] = useState("asc");
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let queryParams = new URLSearchParams();
        if (component === "motherboard" && selectedComponents.cpu) {
          queryParams.append("socket", selectedComponents.cpu.socket);
        }
        const response = await fetch(
          `http://localhost:3001/api/parts/${component}?${queryParams.toString()}`
        );
        const data = await response.json();

        if (component === "ram" && selectedComponents.motherboard) {
          const motherboardMemory =
            selectedComponents.motherboard.memory.toUpperCase();
          const filteredData = data.filter((part) =>
            part.name.toUpperCase().includes(motherboardMemory)
          );
          setParts(filteredData);
        } else if (component === "motherboard" && selectedComponents.cpu) {
          const filteredData = data.filter(
            (part) =>
              part.socket.toUpperCase() ===
              selectedComponents.cpu.socket.toUpperCase()
          );
          setParts(filteredData);
        } else {
          setParts(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (component === "motherboard" && !selectedComponents.cpu) {
      setParts([]);
    } else {
      fetchData();
    }
  }, [component, selectedComponents]);

  const handlePartSelect = (part) => {
    setSelectedComponents((prevSelectedComponents) => ({
      ...prevSelectedComponents,
      [component]: part,
    }));
    navigate("/pc-builder");
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
      <div className="part-selection">
        <h2>Select {component.toUpperCase()}</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder={`Search ${component}`}
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="sort-button" onClick={handleSortOrderChange}>
            Sort by price ({sortOrder})
          </button>
        </div>
        <div className="parts-container">
          <ul className="parts-list">
            {parts
              .filter((part) =>
                part.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .sort((a, b) =>
                sortOrder === "asc" ? a.price - b.price : b.price - a.price
              )
              .map((part) => (
                <li key={part.id} className="part">
                  <div className="part-title">
                    <span>{component.toUpperCase()}</span>
                  </div>
                  <div className="part-info">
                    <span>{part.name}</span>
                    <div className="part-info-line"></div>
                    {component === "motherboard" && (
                      <div className="socket-memory">
                        <div>Socket: {part.socket}</div>
                        <div>Memory: {part.memory}</div>
                      </div>
                    )}
                    {component === "cpu" && (
                      <div className="socket-memory">
                        <div>Socket: {part.socket}</div>
                      </div>
                    )}
                  </div>

                  <div className="part-price">
                    <span>€{part.price}</span>
                  </div>
                  <div className="actions">
                    <button
                      className="select-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePartSelect(part);
                      }}
                    >
                      Select
                    </button>
                    <button
                      className="url-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(part.url, "_blank");
                      }}
                    >
                      Peržiūrėti prekę
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <footer className="App-footer">
        <p>© 2023 PC Builds. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PartSelection;
