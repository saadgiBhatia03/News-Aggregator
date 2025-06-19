from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

@app.route("/analyze-sentiment", methods=["POST"])
def analyze_sentiment():
    data = request.get_json()
    title = data.get("title", "")
    description = data.get("description", "")
    full_text = f"{title} {description}".strip()

    if not full_text:
        return jsonify({"error": "No text provided"}), 400

    analysis = TextBlob(full_text)
    polarity = analysis.sentiment.polarity

    if polarity > 0.1:
        sentiment = "Positive"
    elif polarity < -0.1:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return jsonify({"sentiment": sentiment})

if __name__ == "__main__":
    app.run(port=5000, debug=True)




