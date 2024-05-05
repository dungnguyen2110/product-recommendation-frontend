import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ABC
        </Link>
        <form className="d-flex flex-grow-1">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div className="d-flex align-items-center">
          <Link to="/cart" className="me-3">
            <i className="bi bi-cart"></i>
          </Link>
          <Link to="/login" className="btn btn-outline-primary me-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
