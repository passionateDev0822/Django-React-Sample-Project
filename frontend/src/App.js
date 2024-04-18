import React from "react";
import { Routes } from 'react-router-dom';
import { BrowserRouter, Route } from "react-router-dom";

// import customized components
import CustomersList from "./CustomersList";
import CustomerCreateUpdate from "./CustomerCreateUpdate";

import "./App.css";

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="localhost:8000">
        Django React Demo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/">
            CUSTOMERS
          </a>
          <a className="nav-item nav-link" href="/customer">
            CREATE CUSTOMER
          </a>
        </div>
      </div>
    </nav>

    <div className="content">
        <Routes>
            <Route path="/" element={<CustomersList />} />
            <Route path="/customer/:pk" element={<CustomerCreateUpdate />} />
            <Route path="/customer" element={<CustomerCreateUpdate />} />
        </Routes>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  );
}

export default App;
