from flask import Flask, request, jsonify
from pymongo import MongoClient
from passlib.hash import bcrypt
from flask_cors import CORS

app = Flask(__name__)

client = MongoClient("mongodb+srv://username:password@sawmill.xogl52b.mongodb.net/?retryWrites=true&w=majority")
db = client['Sawmill']
collection = db['customers'] # Should of named this collection Users however i can't be bothered fixing this

cors = CORS(app, resources={r"/*": {"origins": "*"}})  # Allow requests from any origin

@app.route('/API/SMacc.py', methods=['POST', 'OPTIONS'])
def create_account():
    if request.method == 'OPTIONS': #CORS pre-flight requests
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    if request.method == 'POST':
        accData = request.get_json() # Camel case instead of snake? Better for working with JS? 

        name = accData.get('userName')
        company = accData.get('userCompany')
        email = accData.get('userEmail')
        password = accData.get('userPassword')

        new_account = {
            "name": name,
            "company": company,
            "email": email,
            "password": bcrypt.hash(password),
        }

        existing_account = collection.find_one({"email": email}) 
        if existing_account:
            return "An account with the same email already exists."

        try:
            result = collection.insert_one(new_account)
            if result.inserted_id:
                return "Account created successfully!"
            else:
                return "Failed to create an account."
        except Exception as e:
            return f"Error occurred: {str(e)}"

if __name__ == '__main__':
    app.run(port=5002)
