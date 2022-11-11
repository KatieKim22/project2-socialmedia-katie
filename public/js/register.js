const signupFormHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#first_name').value.trim();
    const lastName = document.querySelector('#last_name').value.trim();
    const email = document.querySelector('#regi_email').value.trim();
    const password = document.querySelector('#regi_psw').value.trim();

    if (firstName && lastName && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.register_form')
    .addEventListener('submit', signupFormHandler);