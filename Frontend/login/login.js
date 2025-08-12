const phoneInput = document.querySelector('.phone-input');
const getOtpButton = document.querySelector('.get-otp-button');
const menuIcon = document.getElementById('menuIcon');
const dropdownMenu = document.getElementById('dropdownMenu');


getOtpButton.addEventListener('click', (event) => {
    event.preventDefault();
    const phoneNumber = phoneInput.value.trim();

    if (validatePhoneNumber(phoneNumber)) {
        alert(`OTP sent to ${phoneNumber}`);
    } else {
        alert('Please enter a valid 10-digit mobile number.');
    }
});

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
}

menuIcon.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});
// Login functionality

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify(data.user)); // store user info
        window.location.href = '/Frontend/dashboard/dashboard.html';
    } else {
        alert(data.message || 'Login failed.');
    }
});

console.log('Login script loaded successfully.');