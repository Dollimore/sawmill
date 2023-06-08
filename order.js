function openModal2(element) {
  var productName = element.querySelector('.productName').innerText;
  var modalProductName = document.getElementById('productName');
  modalProductName.innerText = productName;

  var productId = element.getAttribute('data-productId');
  var modalProductId = document.getElementById('productId');
  modalProductId.innerText = productId;

  var modal = document.getElementById('createOrderModal');
  modal.style.display = "block";
}

function closeModal2() {
  var modal = document.getElementById("createOrderModal");
  modal.style.display = "none";

  var displayOrderModal = document.getElementById("displayOrderModal");
  displayOrderModal.style.top = modal.offsetTop + "px";
  displayOrderModal.style.left = modal.offsetLeft + "px";
}



window.onclick = function(event) {
  var modal = document.getElementById("createOrderModal");
  if (event.target == modal) {
    closeModal2();
  }
};

window.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeModal2();
  }
});

document.getElementById("orderForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var productName = document.getElementById("productName").innerText;
  var productId = document.getElementById("productId").innerText;
  var quantity = document.getElementById("quantityInput").value;
  var deliveryDate = document.getElementById("deliveryDateInput").value;
  var companyName = document.getElementById("companyName").value;
  var orderId = document.getElementById("displayRandomString")

  var displayProductName = document.getElementById("displayProductName");
  displayProductName.innerText = productName;

  var displayProductId = document.getElementById("displayProductId");
  displayProductId.innerText = productId;

  var displayQuantity = document.getElementById("displayQuantity");
  displayQuantity.innerText = quantity;

  var displayDeliveryDate = document.getElementById("displayDeliveryDate");
  displayDeliveryDate.innerText = deliveryDate;

  var displayCompanyName = document.getElementById("displayCompanyName");
  displayCompanyName.innerText = companyName;

  var orderId = generateRandomString(8);
  var displayOrderId = document.getElementById("displayRandomString");
  displayOrderId.innerText = orderId; 
  
  closeModal2();
  });
  
  function generateRandomString(length) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    var numbersCount = 0;
  
    for (var i = 0; i < length; i++) {
      if (numbersCount < 3) {
        result += Math.floor(Math.random() * 10);
        numbersCount++;
      } else {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
  
    return result;
}

function sendOrder() {
  var productName = document.getElementById("displayProductName").innerText;
  var productId = document.getElementById("displayProductId").innerText;
  var quantity = document.getElementById("displayQuantity").innerText;
  var deliveryDate = document.getElementById("displayDeliveryDate").innerText;
  var companyName = document.getElementById("displayCompanyName").innerText;
  var orderId = document.getElementById("displayRandomString").innerText;

  if (
    productName.trim() === "" ||
    productId.trim() === "" ||
    quantity.trim() === "" ||
    deliveryDate.trim() === "" ||
    companyName.trim() === "" ||
    orderId.trim() === ""
  ) {
    document.getElementById('statusMessage').textContent = "Please fill in all fields before confirming the order.";
    return; 
  }

  var orderData = {
    productName: productName,
    productId: productId,
    quantity: quantity,
    deliveryDate: deliveryDate,
    companyName: companyName,
    orderId: orderId
};

  fetch('http://127.0.0.1:5001/API/server.py', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then(response => {
      if (response.ok) {
        document.getElementById('statusMessage').textContent = 'Order submitted successfully';
      } else {
        document.getElementById('statusMessage').textContent = 'Error submitting order';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
