import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      searchQuerry : 'business'
    };
  }

  handleSearch = (querry)=>{
    this.setState({searchQuerry:querry})
  }

  // Function to toggle dark mode
  toggleMode = () => {
    
    if(!this.state.isDarkMode){

      this.setState(() => ({
        isDarkMode: true
      }));
      document.body.style.backgroundColor="#495057";
      document.body.style.color="white";
    }
   else{

      this.setState(() => ({
        isDarkMode: false
      }));
      document.body.style.backgroundColor="white";
      document.body.style.color="black";
   }
  };

  render() {
    return (
      <div>
        <Navbar toggleMode= {this.toggleMode} isDarkMode={this.state.isDarkMode} onSearch={this.handleSearch}/>
        <News isDarkMode = {this.state.isDarkMode} searchQuerry={this.state.searchQuerry}/>
      </div>
    )
  }
}
