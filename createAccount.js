var createAccountForm = document.getElementById("createAccountForm");
var createAccountModal = document.getElementById("createAccountModal");
var userNameInput = document.getElementById("userName");
var userCompanyInput = document.getElementById("userCompany");
var userEmailInput = document.getElementById("userEmail");
var userPasswordInput = document.getElementById("userPassword");
var accountStatusMessage = document.getElementById("accountStatusMessage");

function openModal() {
    createAccountModal.style.display = "block";
}

function closeModal() {
    createAccountModal.style.display = "none";
}

window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

createAccountForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

    if (isFormValid()) {
        createNewAccount();
    }
});

function isFormValid() {
    if (
        userNameInput.value.trim() === "" ||
        userCompanyInput.value.trim() === "" ||
        userEmailInput.value.trim() === "" ||
        userPasswordInput.value.trim() === "" ||
        userPasswordInput.value.trim().length < 8
    ) {
        accountStatusMessage.textContent = "Please fill in all fields and provide a password of at least 8 characters.";
        return false; 
    }

    return true;
}

function createNewAccount() {
    var accData = {
        userName: userNameInput.value,
        userCompany: userCompanyInput.value,
        userEmail: userEmailInput.value,
        userPassword: userPasswordInput.value
    };

    postNewAccount(accData);
}

function postNewAccount(accData) {
    fetch('http://127.0.0.1:5002/API/SMacc.py', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(accData),
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Error Creating Account');
        }
    })
    .then(data => {
        if (data === 'An account with the same email already exists.') {
            accountStatusMessage.textContent = data;
        } else {
            accountStatusMessage.textContent = 'Account Created successfully';
            closeModal();
            clearForm();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        accountStatusMessage.textContent = 'Error Creating Account';
    });
}

function clearForm() {
    userNameInput.value = '';
    userCompanyInput.value = '';
    userEmailInput.value = '';
    userPasswordInput.value = '';
}
