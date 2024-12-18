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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-3" to="/">
          <i className="bi bi-newspaper"></i> Kumpulan Berita
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
                  color: isActive ? "yellow" : "white",
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
                  color: isActive ? "yellow" : "white",
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
                  color: isActive ? "yellow" : "white",
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
                  color: isActive ? "yellow" : "white",
                })}
              >
                Saved
              </NavLink>
            </li>

            <li className="nav-item">
              <form className="d-flex ms-3" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari Berita..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-light ms-2">
                  <i className="bi bi-search"></i> Cari
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
