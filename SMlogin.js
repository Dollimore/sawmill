$(document).ready(function() {
  $('#loginForm').on('submit', function(event) {
    event.preventDefault(); 
    
    var email = $('#emailInput').val();
    var password = $('#passwordInput').val();
    
    $('#emailInput').val('');
    $('#passwordInput').val('');
    
    var loginData = {
      email: email,
      password: password
    };

    fetch('http://127.0.0.1:5000/API/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    .then(response => {
      if (response.status === 200) {
        document.getElementById('loginStatusMessage').textContent = 'Login successful';
        var loginButton = document.getElementById('loginButton');
        loginButton.textContent = '\u2713';
        loginButton.style.color = 'green';
        loginButton.disabled = true;
        
        // Populating order information with company name
        fetch('http://127.0.0.1:5000/API/get_user_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.companyName) {
            document.getElementById('companyName').value = data.companyName;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
      } else {
        document.getElementById('loginStatusMessage').textContent = 'Invalid email or password';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
});
