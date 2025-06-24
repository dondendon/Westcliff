// Authentication management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.token = localStorage.getItem('token');
        this.init();
    }

    init() {
        // Check if user is already logged in
        if (this.token) {
            this.validateToken();
        }
        this.updateUI();
    }

    async validateToken() {
        try {
            const response = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.currentUser = data.user;
                this.updateUI();
            } else {
                this.logout();
            }
        } catch (error) {
            console.error('Token validation failed:', error);
            this.logout();
        }
    }

    async register(username, email, password) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('token', this.token);
                this.updateUI();
                this.showAlert('Registration successful! Welcome!', 'success');
                return { success: true };
            } else {
                this.showAlert(data.message || 'Registration failed', 'danger');
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showAlert('Network error. Please try again.', 'danger');
            return { success: false, message: 'Network error' };
        }
    }

    async login(email, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('token', this.token);
                this.updateUI();
                this.showAlert('Login successful!', 'success');
                return { success: true };
            } else {
                this.showAlert(data.message || 'Login failed', 'danger');
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showAlert('Network error. Please try again.', 'danger');
            return { success: false, message: 'Network error' };
        }
    }

    async logout() {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
        } catch (error) {
            console.error('Logout error:', error);
        }

        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('token');
        this.updateUI();
        this.showAlert('Logged out successfully', 'info');
    }

    updateUI() {
        const loginSection = document.getElementById('loginSection');
        const appSection = document.getElementById('appSection');
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const usernameSpan = document.getElementById('username');

        if (this.currentUser) {
            // User is logged in
            loginSection.classList.add('d-none');
            appSection.classList.remove('d-none');
            authButtons.classList.add('d-none');
            userMenu.classList.remove('d-none');
            usernameSpan.textContent = this.currentUser.username;
            
            // Load coffee beans if app is available
            if (window.coffeeApp) {
                window.coffeeApp.loadCoffeeBeans();
            }
        } else {
            // User is not logged in
            loginSection.classList.remove('d-none');
            appSection.classList.add('d-none');
            authButtons.classList.remove('d-none');
            userMenu.classList.add('d-none');
        }
    }

    showAlert(message, type) {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Insert alert at the top of the container
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    getToken() {
        return this.token;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Global functions for HTML onclick events
window.showLoginModal = () => {
    if (window.modalManager) {
        window.modalManager.showLoginModal();
    }
};

window.showRegisterModal = () => {
    if (window.modalManager) {
        window.modalManager.showRegisterModal();
    }
};

window.logout = () => {
    authManager.logout();
};

// Make auth manager globally available
window.authManager = authManager;