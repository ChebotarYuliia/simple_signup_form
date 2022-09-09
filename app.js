const selectors = {
    form: document.querySelector('.signup-form'),
    inputs: document.querySelectorAll('.signup-form input'),
};

function getInputsValues() {
    let result = {};

    Array.from(selectors.inputs).map(input => {
        result[input.name] = input.value;
    });

    return result;
};

function validateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function showError(inputName, text) {
    selectors.inputs.forEach(input => {
        if (input.name === inputName) {
            const msg = document.createElement('p');
            msg.classList.add('text-error');
            msg.innerHTML = `${text}`;

            input.closest('.signup-input-wrapper').classList.add('error');
            input.closest('.signup-input-wrapper').appendChild(msg);
        }
    })
};

function removeError(element) {
    element.closest('.signup-input-wrapper').classList.remove('error');
    element.closest('.signup-input-wrapper').querySelector('.text-error')?.remove();
};

function hideErrors() {
    selectors.inputs.forEach(input => {
        removeError(input);
    });
};

function handleValidation() {
    hideErrors();

    const { name, lastName, email, password } = getInputsValues();
    let res = true;

    if (name.length === 0) {
        showError('name', 'First name cannot be empty');
        res = false;
    };
    if (lastName.length === 0) {
        showError('lastName', 'Last name cannot be empty');
        res = false;
    };
    if (email.length === 0) {
        showError('email', 'Email cannot be empty');
        res = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Looks like this is not an email');
        res = false;
    };
    if (password.length === 0) {
        showError('password', 'Password cannot be empty');
        res = false;
    };

    return res;
};

function handleSubmit(e) {
    e.preventDefault();
    if (handleValidation()) {
        window.location.href = "thankyou.html";
    };
};

selectors.inputs.forEach(input => {
    input.addEventListener('input', () => {
        removeError(input);
    });
});

selectors.form.addEventListener('submit', e => {
    handleSubmit(e);
});