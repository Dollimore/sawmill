from flask import Flask, request, jsonify
from pymongo import MongoClient
from passlib.hash import bcrypt
from flask_cors import CORS

app = Flask(__name__)
client = MongoClient("mongodb+srv://username:password@sawmill.xogl52b.mongodb.net/?retryWrites=true&w=majority")
db = client['Sawmill']
collection = db['customers']
CORS(app) # Don't need all this jazz for login?

@app.route('/API/login', methods=['POST'])
def login():
    loginData = request.get_json()
    email = loginData.get('email')
    password = loginData.get('password')

    account = collection.find_one({"email": email})
    if account:
        stored_password = account.get('password')
        if bcrypt.verify(password, stored_password):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Invalid email or password"}), 401 # Check if 401 is appropriate error code...
    else:
        return jsonify({"message": "Invalid email or password"}), 401

@app.route('/API/get_user_data', methods=['POST'])
def get_user_data():
    email = request.get_json().get('email')
    account = collection.find_one({"email": email})
    if account:
        company = account.get('company')
        return jsonify({"companyName": company}), 200
    else:
        return jsonify({"message": "User not found"}), 404


if __name__ == '__main__':
    app.run(port=5000)