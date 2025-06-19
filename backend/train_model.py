import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Sample training data (you can expand this later)
train_texts = [
    "Stock market hits record high",                      # Positive
    "Economy is improving steadily",                      # Positive
    "Earthquake causes massive destruction",              # Negative
    "Floods kill dozens in the city",                     # Negative
    "New laws passed in parliament",                      # Neutral
    "The meeting was held in Delhi",                      # Neutral
]

train_labels = [
    "Positive", "Positive",
    "Negative", "Negative",
    "Neutral", "Neutral"
]

# Vectorize the text
vectorizer = TfidfVectorizer()
X_train = vectorizer.fit_transform(train_texts)

# Train the model
model = MultinomialNB()
model.fit(X_train, train_labels)

# Save the model and vectorizer
joblib.dump(model, 'sentiment_model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')

print("Model and vectorizer saved successfully.")
