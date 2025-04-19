// Inicio - Obtención de elementos del DOM
const container = document.querySelector('.container');
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');

// Inicio - Eventos para cambiar entre formularios
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// Inicio - Validación de formularios
const loginForm = document.querySelector('.login form');
const registerForm = document.querySelector('.register form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir envío por defecto
    // Aquí iría la lógica de validación del inicio de sesión
    console.log('Formulario de inicio de sesión enviado');
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir envío por defecto
    // Aquí iría la lógica de validación del registro
    console.log('Formulario de registro enviado');
});

// Inicio - Manejo de enlaces sociales
const socialIcons = document.querySelectorAll('.social-icons a');

socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        // Aquí iría la lógica para el inicio de sesión con redes sociales
        console.log('Inicio de sesión con red social clickeado');
    });
});

// Inicio - Manejo del enlace "Olvidaste tu contraseña"
const forgotLink = document.querySelector('.forgot-link a');

forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Aquí iría la lógica para recuperar contraseña
    console.log('Recuperación de contraseña solicitada');
});

// Funcionalidad mostrar/ocultar contraseña
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bx-show');
            icon.classList.add('bx-hide');
        } else {
            input.type = 'password';
            icon.classList.remove('bx-hide');
            icon.classList.add('bx-show');
        }
    });
});

// Validación de contraseña
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
}

const registerPassword = document.querySelector('#registerPassword');
const confirmPassword = document.querySelector('#confirmPassword');
const strengthIndicator = document.querySelector('.password-strength');

registerPassword.addEventListener('input', function() {
    const strength = checkPasswordStrength(this.value);
    let message = '';
    let className = '';
    
    switch(strength) {
        case 0:
        case 1:
            message = 'Contraseña débil';
            className = 'weak';
            break;
        case 2:
        case 3:
            message = 'Contraseña media';
            className = 'medium';
            break;
        case 4:
            message = 'Contraseña fuerte';
            className = 'strong';
            break;
    }
    
    strengthIndicator.textContent = message;
    strengthIndicator.className = 'password-strength ' + className;
});

// Validación del formulario de registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.querySelector('#registerUsername').value;
    const email = document.querySelector('#registerEmail').value;
    const password = registerPassword.value;
    const confirmPwd = confirmPassword.value;
    
    let isValid = true;
    const errors = {};
    
    // Validación de usuario
    if (username.length < 3) {
        isValid = false;
        errors.username = 'El usuario debe tener al menos 3 caracteres';
    }
    
    // Validación de email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        isValid = false;
        errors.email = 'Ingrese un email válido';
    }
    
    // Validación de contraseña
    if (checkPasswordStrength(password) < 3) {
        isValid = false;
        errors.password = 'La contraseña no cumple con los requisitos mínimos';
    }
    
    // Validación de confirmación de contraseña
    if (password !== confirmPwd) {
        isValid = false;
        errors.confirm = 'Las contraseñas no coinciden';
    }
    
    // Mostrar errores o proceder con el registro
    if (!isValid) {
        Object.keys(errors).forEach(field => {
            const input = document.getElementById('register' + field.charAt(0).toUpperCase() + field.slice(1));
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errors[field];
            input.parentElement.appendChild(errorDiv);
            
            // Remover mensaje de error después de 3 segundos
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        });
    } else {
        console.log('Formulario de registro válido:', { username, email, password });
        // Aquí iría la lógica para enviar los datos al servidor
    }
});

// Validación del formulario de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.querySelector('#loginUsername').value;
    const password = document.querySelector('#loginPassword').value;
    
    let isValid = true;
    const errors = {};
    
    if (!username) {
        isValid = false;
        errors.username = 'Ingrese su nombre de usuario';
    }
    
    if (!password) {
        isValid = false;
        errors.password = 'Ingrese su contraseña';
    }
    
    if (!isValid) {
        Object.keys(errors).forEach(field => {
            const input = document.getElementById('login' + field.charAt(0).toUpperCase() + field.slice(1));
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errors[field];
            input.parentElement.appendChild(errorDiv);
            
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        });
    } else {
        console.log('Formulario de login válido:', { username, password });
        // Aquí iría la lógica para enviar los datos al servidor
    }
});