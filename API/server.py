from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable Cross Origin Resource Sharing 


client = MongoClient('mongodb+srv://username:password@sawmill.xogl52b.mongodb.net/?retryWrites=true&w=majority')
db = client['Sawmill']
collection = db['orders']


@app.route('/API/server.py', methods=['POST']) 
def create_order():
    order_data = request.get_json()  


    productName = order_data['productName']
    productId = order_data['productId']
    quantity = order_data['quantity']
    deliveryDate = order_data['deliveryDate']
    companyName = order_data['companyName']
    orderID = order_data['orderId']


    new_order = {
        'Product Name': productName, 
        'Product Id': productId,
        'Quantity In Meters': quantity,
        'Delivery Date': deliveryDate,
        'Company Name': companyName,
        'Order Id': orderID
    }

    collection.insert_one(new_order)

    return jsonify({'message': 'Order saved successfully'})

if __name__ == '__main__':
    app.run(port=5001)
