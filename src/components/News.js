import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import "./Custom.css";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      searchQuery: props.searchQuery || "",
      category: props.category || "general",
      hasFetched: false, // ✅ Added to control 'No results found'
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevProps.category !== this.props.category
    ) {
      this.setState(
        {
          category: this.props.category || "general",
          searchQuery: this.props.searchQuery,
          page: 1,
        },
        () => this.fetchNews()
      );
    }
  }

  fetchNews = async () => {
    const { page, searchQuery, category } = this.state;
    const { apiKey } = this.props;

    this.setState({ loading: true });

    const baseUrl = "https://newsapi.org/v2/";
    const endpoint = searchQuery ? "everything" : "top-headlines";
    const url = `${baseUrl}${endpoint}?${
      searchQuery
        ? `q=${encodeURIComponent(searchQuery)}`
        : `country=in&category=${category}`
    }&apiKey=${apiKey}&page=${page}&pageSize=9`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok") {
        const analyzeSentiment = async (article) => {
          const res = await fetch("http://127.0.0.1:5000/analyze-sentiment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: article.title,
              description: article.description,
            }),
          });

          const result = await res.json();
          return result.sentiment;
        };

        const articlesWithSentiment = await Promise.all(
          (data.articles || []).map(async (article) => {
            const sentiment = await analyzeSentiment(article);
            return { ...article, sentiment };
          })
        );

        this.setState({
          articles: articlesWithSentiment,
          totalResults: data.totalResults || 0,
          loading: false,
          hasFetched: true,
        });
      } else {
        this.setState({
          articles: [],
          loading: false,
          hasFetched: true,
        });
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false, hasFetched: true });
    }
  };

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.fetchNews
    );
  };

  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.fetchNews
    );
  };

  handleSearchInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.setState({ page: 1 }, this.fetchNews);
  };
  handleBookmark = (article) => {
    // You can enhance this later by saving to localStorage or database
    console.log("Bookmarked article:", article);
    alert("Bookmarked: " + (article.title || "No Title"));
  };
  
  handleBookmark = (article) => {
    this.setState((prevState) => {
      const alreadyBookmarked = prevState.bookmarks.some(
        (a) => a.url === article.url
      );
      if (!alreadyBookmarked) {
        return { bookmarks: [...prevState.bookmarks, article] };
      }
      return null; // no state change if already bookmarked
    });
  };
  

  render() {
    const { articles, loading, page, totalResults, searchQuery, hasFetched } =
      this.state;
    const { isDarkMode } = this.props;
    const filteredArticles =
      this.state.selectedSentiment && this.state.selectedSentiment !== "All"
        ? articles.filter(
            (article) => article.sentiment === this.state.selectedSentiment
          )
        : articles;

    return (
      <div
        className={`container my-3 ${isDarkMode ? "text-light bg-dark" : ""}`}
        id="main"
      >
        <h2 className="mb-4">NewsDaily - Top Headlines</h2>

        {/* Search Bar */}
        <form className="d-flex mb-4" onSubmit={this.handleSearchSubmit}>
          <input
            className={`form-control me-2 ${
              isDarkMode ? "bg-dark text-white" : ""
            }`}
            type="search"
            placeholder="Search news..."
            value={searchQuery}
            onChange={this.handleSearchInputChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        {/* Sentiment Filter Dropdown */}
        <div
          className="mb-3"
          style={{
            position: "absolute",
            top: "90px",
            right: "20px",
            width: "200px",
            zIndex: 1000,
          }}
        >
          <label className="form-label" style={{ fontSize: "0.9rem" }}>
            Filter by Sentiment:{" "}
          </label>
          <select
            className="form-select"
            value={this.state.selectedSentiment || "All"}
            onChange={(e) =>
              this.setState({ selectedSentiment: e.target.value })
            }
          >
            <option value="Positive">
              <span role="img" aria-label="Positive">
                🟢
              </span>{" "}
              Positive
            </option>
            <option value="Negative">
              <span role="img" aria-label="Negative">
                🔴
              </span>{" "}
              Negative
            </option>
            <option value="Neutral">
              <span role="img" aria-label="Neutral">
                ⚪
              </span>{" "}
              Neutral
            </option>
          </select>
        </div>

        {/* Spinner */}
        {loading && <Spinner />}

        {/* News Items */}
        <div className="row">
          {!loading && Array.isArray(articles) && articles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <div className="col-md-4 my-3" key={index}>
                <NewsItem
                  title={article.title || ""}
                  description={article.description || ""}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  isDarkMode={isDarkMode}
                  sentiment={article.sentiment}
                  onBookmark={this.props.onBookmark}
                  article={article}
                />
              </div>
            ))
          ) : !loading && hasFetched ? (
            <p>No results found.</p>
          ) : null}
        </div>

        {/* Pagination Buttons */}
        <div className="d-flex justify-content-between my-3">
          <button
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page + 1 > Math.ceil(totalResults / 9)}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
