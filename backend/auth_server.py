from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


USERS_FILE = 'users.json'

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'status': 'error', 'message': 'Username and password are required'}), 400

        if not os.path.exists(USERS_FILE):
            with open(USERS_FILE, 'w') as f:
                json.dump([], f)

        with open(USERS_FILE, 'r') as f:
            users = json.load(f)

        # Check if user already exists
        for user in users:
            if user['username'] == username:
                return jsonify({'status': 'error', 'message': 'User already exists'}), 400

        users.append({'username': username, 'password': password})
        with open(USERS_FILE, 'w') as f:
            json.dump(users, f)

        return jsonify({'status': 'success'}), 200

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not os.path.exists(USERS_FILE):
            return jsonify({'status': 'error', 'message': 'No users registered yet'}), 400

        with open(USERS_FILE, 'r') as f:
            users = json.load(f)

        for user in users:
            if user['username'] == username and user['password'] == password:
                return jsonify({'status': 'success'}), 200

        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5001, debug=True)

