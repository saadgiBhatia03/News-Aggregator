import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import Login from "./components/Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      category: 'general',
      searchQuery: '',
      isLoggedIn: false, // ✅ Step 1: Login state
      bookmarks: [], // ✅ add this line

    };
    this.apiKey = process.env.REACT_APP_NEWS_API;
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, category: '' });
  };

  handleCategoryChange = (category) => {
    this.setState({ category, searchQuery: '' });
  };

  toggleMode = () => {
    const isDark = !this.state.isDarkMode;
    this.setState({ isDarkMode: isDark });
    document.body.style.backgroundColor = isDark ? '#495057' : 'white';
    document.body.style.color = isDark ? 'white' : 'black';
  };

  // ✅ Step 2: Login success handler
  handleLoginSuccess = () => {
    this.setState({ isLoggedIn: true });
  };
  // ✅ To handle bookmarking
handleAddBookmark = (article) => {
  this.setState((prevState) => ({
    bookmarks: [...prevState.bookmarks, article],
  }));
};

// ✅ To handle removing bookmark (optional for toggle)
handleRemoveBookmark = (url) => {
  this.setState((prevState) => ({
    bookmarks: prevState.bookmarks.filter((article) => article.url !== url),
  }));
};


  render() {
    const { isDarkMode, category, searchQuery, isLoggedIn } = this.state;

    return (
      <div>
        {!isLoggedIn ? (
          <Login onLoginSuccess={this.handleLoginSuccess} />
        ) : (
          <>
            <Navbar
              toggleMode={this.toggleMode}
              isDarkMode={isDarkMode}
              onSearch={this.handleSearch}
              onCategoryChange={this.handleCategoryChange}
            />
            <News
              apiKey={this.apiKey}
              isDarkMode={isDarkMode}
              searchQuery={searchQuery}
              category={category}
            />
          </>
        )}
      </div>
    );
  }
}
