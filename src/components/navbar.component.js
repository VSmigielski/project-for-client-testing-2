import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Question Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Questions</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Questions Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/difficulty" className="nav-link">Create Difficulty</Link>
          </li>
          <li className="navbar-item">
          <Link to="/times" className="nav-link">Create Time</Link>
          </li>
          <li className="navbar-item">
          <Link to="/subjects" className="nav-link">Create Subject</Link>
          </li>
          <li className="navbar-item">
          <Link to="/createTest" className="nav-link">Create Test</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}