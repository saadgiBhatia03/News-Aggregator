import React, { Component } from 'react';
import DarkModeToggle from './DarkModeToggle';
import './Custom.css';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSearchClick = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.query || 'general');
  };

  handleCategoryClick = (category) => {
    this.setState({ query: '' });
    this.props.onSearch(category);
  };

  render() {
    const { isDarkMode, toggleMode } = this.props;
    const categories = ['general', 'business', 'sports', 'technology', 'health', 'entertainment', 'science'];

    return (
      <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} fixed-top`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/newsdaily-logo.svg" alt="NewsDaily Logo" style={{ height: '40px' }} />
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {categories.map((cat) => (
                <li className="nav-item" key={cat}>
                  <button
                    className={`btn btn-sm mx-1 ${isDarkMode ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => this.handleCategoryClick(cat)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            <form className="d-flex" onSubmit={this.handleSearchClick}>
              <input
                id="searchInput"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.query}
                onChange={this.handleInputChange}
              />
              <button className="btn btn-success" type="submit">Search</button>
            </form>

            <div className="ms-3">
              <DarkModeToggle isDarkMode={isDarkMode} toggleMode={toggleMode} />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
