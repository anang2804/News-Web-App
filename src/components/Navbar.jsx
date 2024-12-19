import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold text-primary" to="/">
          BeritaKu
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#007bff" : "#6c757d",
                })}
              >
                Indonesia
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/programming"
                className="nav-link"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#007bff" : "#6c757d",
                })}
              >
                Programming
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/tiktok"
                className="nav-link"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#007bff" : "#6c757d",
                })}
              >
                Tiktok
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/saved"
                className="nav-link"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#007bff" : "#6c757d",
                })}
              >
                Saved
              </NavLink>
            </li>
          </ul>
          <form className="d-flex ms-lg-3" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="Cari berita..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Cari
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
