let loggedInUserId = null;

function login() {
    const login = document.getElementById('Login').value;
    const password = document.getElementById('Password').value;
    const url = 'http://quillcontacts.com/LAMPAPI/Login.php';

    const data = {
        login: login,
        password: password,
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.error === '') {
            loggedInUserId = data.id;
            alert('Login Successful! User ID: ' + loggedInUserId);
            showContactsSection();
        } else {
            alert('Login Failed: ' + data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showContactsSection() {
    const loginForm = document.getElementById('loginForm');
    const contactsSection = document.getElementById('contactsSection');
    const logoutButton = document.getElementById('logoutButton');

    loginForm.style.display = 'none';
    contactsSection.style.display = 'block';
    logoutButton.style.display = 'block';
}

function searchContacts() {
    const search = document.getElementById('search').value;
    const url = 'http://quillcontacts.com/LAMPAPI/SearchContact.php';

    const data = {
        search: search,
        userId: loggedInUserId,
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.error === '') {
            // Display search results
            const results = data.results;
            const resultsDiv = document.getElementById('searchResults');
            resultsDiv.innerHTML = JSON.stringify(results);
        } else {
            alert('Search Failed: ' + data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function createContact() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const url = 'http://quillcontacts.com/LAMPAPI/CreateContact.php';

    const data = {
        UserId: loggedInUserId,
        FirstName: firstName,
        LastName: lastName,
        Phone: phone,
        Email: email,
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.error === '') {
            alert('Contact created! Contact ID: ' + data.contactId);
        } else {
            alert('Contact creation failed: ' + data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function logout() {
    loggedInUserId = null;
    const loginForm = document.getElementById('loginForm');
    const contactsSection = document.getElementById('contactsSection');
    const logoutButton = document.getElementById('logoutButton');

    loginForm.style.display = 'block';
    contactsSection.style.display = 'none';
    logoutButton.style.display = 'none';
}
