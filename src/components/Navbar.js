import React, { Component } from 'react';
import DarkModeToggle from './DarkModeToggle';

import './Custom.css';


export class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  // Handle input change in search bar
  handleInputChange = (e) => {
    this.setState({ query: e.target.value }); // Update local state
  };

  // Handle search button click
  handleSearchClick = (e) => {
    e.preventDefault();
    
    // Check if the element exists before accessing it
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      console.log(searchInput.value); // Use the value of the input element
    }
  
    this.props.onSearch(this.state.query); // Pass the query state to the parent
  };

  render() {
    const { isDarkMode, toggleMode } = this.props;

    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top " data-bs-theme={`${isDarkMode?"dark":"dark"}`} >
        <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/newsdaily-logo.svg"
            alt="NewsDaily Logo"
            style={{ height: '40px' }}
          />
        </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input id='searchInput'
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.query}
                onChange={this.handleInputChange} // Update local state on input change
                
              />
              <button className="btn btn-success" type="submit" onClick={this.handleSearchClick}>
                Search
              </button>
            </form>
            <div className={`form-check form-switch  mx-3 text-light`}>
              {/* <input className="form-check-input"type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable DarkMode</label> */}
              <DarkModeToggle isDarkMode={isDarkMode} toggleMode={toggleMode}/>
            </div>  
          </div>
        </div>
      </nav>
        
{/* <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">NewsDaily</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/about">About</a>
        </li>

        <div className={`form-check form-switch  mx-3 text-light`}>
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable DarkMode</label>
            </div>  
      </ul>
    </div>
  </div>
</nav> */}
        
      </div>
    )
  }
}

export default Navbar
