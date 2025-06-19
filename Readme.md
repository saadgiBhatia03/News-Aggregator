# 📰 NEWS SPHERE: Personalized News Aggregator

A full-stack AI-powered news aggregator web application that delivers real-time news updates, allows personalized filtering based on user interest and sentiment, and includes user authentication, dark mode, and bookmarking features.

---

## 🚀 Features

- 🔐 **User Authentication** (Login & Register)
- 🧠 **NLP-based Sentiment Analysis** using TextBlob
- 🔎 **Search & Filter by Sentiment** (Positive / Negative / Neutral)
- 📂 **News Categorization** (Business, Sports, Technology, etc.)
- 🌓 **Dark Mode Support**
- 📌 **Bookmarking System**
- 🔁 **Pagination for News Feed**
- 🧠 **Customizable Sentiment Model** with TF-IDF + Naive Bayes (Training Script Provided)

---

## 🧠 AI/NLP Integration

- Sentiment Analysis is performed via a Flask backend.
- Each news article's **title** and **description** are analyzed using:
  - `TextBlob` (default)
  - Optionally train your own model using `train_model.py` with TF-IDF & Naive Bayes.
- Output sentiment: **Positive**, **Negative**, or **Neutral**

---

## 🛠️ Tech Stack

### Frontend (React.js)
- React.js
- Axios (for API calls)
- Bootstrap (UI)
- Dark Mode Toggle
- Component-based structure (News.js, Navbar.js, NewsItem.js, etc.)

### Backend (Flask - Python)
- Flask
- Flask-CORS
- TextBlob for sentiment analysis
- Custom sentiment classifier (TF-IDF + MultinomialNB)
- RESTful API (`/analyze-sentiment`, `/login`, `/register`)

---

## 🧾 File Structure

