const form = document.querySelector('form');
const passwordInput = document.querySelector('input[name="password"]');
const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');


form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Send data to server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.ok) {
                alert('Signup successful!');
                window.location.href = '/login/login.html';
            } else {
                return response.json().then((error) => {
                    throw new Error(error.message || 'Signup failed.');
                });
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});

