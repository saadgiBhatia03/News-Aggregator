import React, { Component } from 'react';
import './Custom.css';

export class NewsItem extends Component {
  handleBookmarkClick = () => {
    const { onBookmark, article } = this.props;
    if (onBookmark && article) {
      onBookmark(article);
    }
  };

  render() {
    const {
      title,
      description,
      imageUrl,
      newsUrl,
      isDarkMode,
      sentiment,
    } = this.props;

    let sentimentLabel = '';
    if (sentiment === 'Positive') {
      sentimentLabel = '🟢 Positive';
    } else if (sentiment === 'Negative') {
      sentimentLabel = '🔴 Negative';
    } else if (sentiment === 'Neutral') {
      sentimentLabel = '⚪ Neutral';
    }

    return (
      <div>
        <div
          className="card newsItemBody"
          style={{
            backgroundColor: isDarkMode ? '#2b3035' : 'white',
            color: isDarkMode ? 'white' : 'black',
          }}
        >
          <img
            src={
              !imageUrl
                ? 'https://licindia.in/documents/d/guest/no_image_news'
                : imageUrl
            }
            className="card-img-top"
            alt="news"
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p>
              <strong>Sentiment:</strong> {sentimentLabel}
            </p>
            <a
              rel="noopener noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-dark btn-sm me-2"
              style={{ backgroundColor: isDarkMode ? 'black' : '#212529' }}
            >
              Read More
            </a>
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={this.handleBookmarkClick}
            >
              📌 Bookmark
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
