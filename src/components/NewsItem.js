import React, { Component } from 'react'
import './Custom.css';

export class NewsItem extends Component {
  render() {
    const {isDarkMode} = this.props;
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card newsItemBody" style={{backgroundColor:isDarkMode?"#2b3035":"white", color:isDarkMode?"white":"black"}}>
            <img src= {!imageUrl?"https://licindia.in/documents/d/guest/no_image_news":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a rel="noopener noreferrer" href={newsUrl} target= "_blank" className="btn btn-dark btn-sm" style={{backgroundColor:isDarkMode?"black":"#212529"}}>Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
