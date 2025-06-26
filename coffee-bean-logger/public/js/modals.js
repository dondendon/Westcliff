// Modal management
class ModalManager {
    constructor() {
        this.modalsContainer = document.getElementById('modalsContainer');
        this.createModals();
    }

    createModals() {
        this.modalsContainer.innerHTML = `
            <!-- Login Modal -->
            <div class="modal fade" id="loginModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Login</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="loginForm">
                                <div class="mb-3">
                                    <label for="loginEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="loginEmail" required>
                                </div>
                                <div class="mb-3">
                                    <label for="loginPassword" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="loginPassword" required>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>
                            </form>
                            <div class="text-center mt-3">
                                <small>Don't have an account? <a href="#" onclick="switchToRegister()">Sign up</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Register Modal -->
            <div class="modal fade" id="registerModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Sign Up</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="registerForm">
                                <div class="mb-3">
                                    <label for="registerUsername" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="registerUsername" required minlength="3">
                                </div>
                                <div class="mb-3">
                                    <label for="registerEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="registerEmail" required>
                                </div>
                                <div class="mb-3">
                                    <label for="registerPassword" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="registerPassword" required minlength="6">
                                </div>
                                <div class="mb-3">
                                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                                    <input type="password" class="form-control" id="confirmPassword" required>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                            <div class="text-center mt-3">
                                <small>Already have an account? <a href="#" onclick="switchToLogin()">Login</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add/Edit Coffee Bean Modal -->
            <div class="modal fade" id="coffeeModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="coffeeModalTitle">Add Coffee Bean</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="coffeeForm">
                                <input type="hidden" id="coffeeId">
            <div class="mb-3">
  <label for="coffeeImage" class="form-label">Image</label>
  <input type="file" class="form-control" id="coffeeImage" accept="image/*">
</div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="coffeeBrand" class="form-label">Brand *</label>
                                            <input type="text" class="form-control" id="coffeeBrand" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="coffeeOrigin" class="form-label">Origin</label>
                                            <input type="text" class="form-control" id="coffeeOrigin" placeholder="e.g., Colombia, Ethiopia">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="coffeePrice" class="form-label">Price ($) *</label>
                                            <input type="number" class="form-control" id="coffeePrice" step="0.01" min="0" required>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="coffeeWeightValue" class="form-label">Weight *</label>
                                            <input type="number" class="form-control" id="coffeeWeightValue" step="0.1" min="0" required>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="coffeeWeightUnit" class="form-label">Unit</label>
                                            <select class="form-select" id="coffeeWeightUnit">
                                                <option value="oz">oz</option>
                                                <option value="g">g</option>
                                                <option value="lb">lb</option>
                                                <option value="kg">kg</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="coffeeRating" class="form-label">Rating *</label>
                                    <select class="form-select" id="coffeeRating" required>
                                        <option value="">Select rating...</option>
                                        <option value="1">1 Star</option>
                                        <option value="2">2 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="5">5 Stars</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="coffeeFlavorProfile" class="form-label">Flavor Profile</label>
                                    <input type="text" class="form-control" id="coffeeFlavorProfile" 
                                           placeholder="e.g., fruity, nutty, chocolatey (separate with commas)">
                                    <div class="form-text">Enter flavors separated by commas</div>
                                </div>
                                <div class="mb-3">
                                    <label for="coffeeNotes" class="form-label">Notes</label>
                                    <textarea class="form-control" id="coffeeNotes" rows="3" 
                                              placeholder="Brew method, tasting notes, etc."></textarea>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-success" id="coffeeSubmitBtn">Add Coffee Bean</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- View Coffee Bean Modal -->
            <div class="modal fade" id="viewCoffeeModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="viewCoffeeTitle">Coffee Bean Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body" id="viewCoffeeContent">
                            <!-- Content will be populated dynamically -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="editCoffeeBtn">Edit</button>
                            <button type="button" class="btn btn-danger" id="deleteCoffeeBtn">Delete</button>
                        </div>

                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const result = await authManager.login(email, password);
            if (result.success) {
                bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
                document.getElementById('loginForm').reset();
            }
        });

        // Register form
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                authManager.showAlert('Passwords do not match', 'danger');
                return;
            }

            const result = await authManager.register(username, email, password);
            if (result.success) {
                bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
                document.getElementById('registerForm').reset();
            }
        });

        // Coffee form
        document.getElementById('coffeeForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveCoffeeBean();
        });

        // Edit and delete buttons in view modal
        document.getElementById('editCoffeeBtn').addEventListener('click', () => {
            const coffeeId = this.currentViewingCoffee._id;
            bootstrap.Modal.getInstance(document.getElementById('viewCoffeeModal')).hide();
            this.showEditModal(this.currentViewingCoffee);
        });

        document.getElementById('deleteCoffeeBtn').addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this coffee bean log?')) {
                await this.deleteCoffeeBean(this.currentViewingCoffee._id);
                bootstrap.Modal.getInstance(document.getElementById('viewCoffeeModal')).hide();
            }
        });
    }

    showLoginModal() {
        const modal = new bootstrap.Modal(document.getElementById('loginModal'));
        modal.show();
    }

    showRegisterModal() {
        const modal = new bootstrap.Modal(document.getElementById('registerModal'));
        modal.show();
    }

    showAddModal() {
        this.resetCoffeeForm();
        document.getElementById('coffeeModalTitle').textContent = 'Add Coffee Bean';
        document.getElementById('coffeeSubmitBtn').textContent = 'Add Coffee Bean';
        const modal = new bootstrap.Modal(document.getElementById('coffeeModal'));
        modal.show();
    }

    showEditModal(coffeeBean) {
        this.populateCoffeeForm(coffeeBean);
        document.getElementById('coffeeModalTitle').textContent = 'Edit Coffee Bean';
        document.getElementById('coffeeSubmitBtn').textContent = 'Update Coffee Bean';
        const modal = new bootstrap.Modal(document.getElementById('coffeeModal'));
        modal.show();
    }



    showViewModal(coffeeBean) {
        this.currentViewingCoffee = coffeeBean;
        document.getElementById('viewCoffeeTitle').textContent = coffeeBean.brand;
        
        const content = document.getElementById('viewCoffeeContent');
        content.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="coffee-bean-icon mb-3"></div>
                    <h4>${coffeeBean.brand}</h4>
                    ${coffeeBean.origin ? `<p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${coffeeBean.origin}</p>` : ''}
                </div>
                <div class="col-md-6">
                    <div class="rating-stars mb-2">
                        ${this.generateStars(coffeeBean.rating)}
                        <span class="ms-2">(${coffeeBean.rating}/5)</span>
                    </div>
                    <p><strong>Price:</strong> $${coffeeBean.price}</p>
                    <p><strong>Weight:</strong> ${coffeeBean.weight.value}${coffeeBean.weight.unit}</p>
                    <p><strong>Added:</strong> ${new Date(coffeeBean.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            ${coffeeBean.flavorProfile && coffeeBean.flavorProfile.length > 0 ? `
                <div class="mt-3">
                    <strong>Flavor Profile:</strong><br>
                    ${coffeeBean.flavorProfile.map(flavor => `<span class="flavor-tag">${flavor}</span>`).join('')}
                </div>
            ` : ''}
            ${coffeeBean.notes ? `
                <div class="mt-3">
                    <strong>Notes:</strong>
                    <p>${coffeeBean.notes}</p>
                </div>
            ` : ''}
        `;

        const modal = new bootstrap.Modal(document.getElementById('viewCoffeeModal'));
        modal.show();
    }

    resetCoffeeForm() {
        document.getElementById('coffeeForm').reset();
        document.getElementById('coffeeId').value = '';
    }

    populateCoffeeForm(coffeeBean) {
        document.getElementById('coffeeId').value = coffeeBean._id;
        document.getElementById('coffeeBrand').value = coffeeBean.brand;
        document.getElementById('coffeeOrigin').value = coffeeBean.origin || '';
        document.getElementById('coffeePrice').value = coffeeBean.price;
        document.getElementById('coffeeWeightValue').value = coffeeBean.weight.value;
        document.getElementById('coffeeWeightUnit').value = coffeeBean.weight.unit;
        document.getElementById('coffeeRating').value = coffeeBean.rating;
        document.getElementById('coffeeFlavorProfile').value = coffeeBean.flavorProfile ? coffeeBean.flavorProfile.join(', ') : '';
        document.getElementById('coffeeNotes').value = coffeeBean.notes || '';
    }

async saveCoffeeBean() {
    const coffeeId = document.getElementById('coffeeId').value;
    const imageInput = document.getElementById('coffeeImage');
    const imageFile = imageInput && imageInput.files.length > 0 ? imageInput.files[0] : null;

    const coffeeData = {
        brand: document.getElementById('coffeeBrand').value,
        origin: document.getElementById('coffeeOrigin').value,
        price: parseFloat(document.getElementById('coffeePrice').value),
        weight: {
            value: parseFloat(document.getElementById('coffeeWeightValue').value),
            unit: document.getElementById('coffeeWeightUnit').value
        },
        rating: parseInt(document.getElementById('coffeeRating').value),
        flavorProfile: document.getElementById('coffeeFlavorProfile').value
            .split(',')
            .map(flavor => flavor.trim())
            .filter(flavor => flavor.length > 0),
        notes: document.getElementById('coffeeNotes').value
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(coffeeData));
    if (imageFile) {
        formData.append('image', imageFile);
    }

//new
        const url = coffeeId ? `/api/coffee-beans/${coffeeId}` : '/api/coffee-beans';
        const method = coffeeId ? 'PUT' : 'POST';

        const submitBtn = document.getElementById('coffeeSubmitBtn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving...';

        try {
            const token = window.authManager ? window.authManager.getToken() : null;
            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                method,
                headers,
                body: formData
            });


/* pre claud
    try {
        const url = coffeeId ? `/api/coffee-beans/${coffeeId}` : '/api/coffee-beans';
        const method = coffeeId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${authManager.getToken()}`
            },
            //body: JSON.stringify(coffeeData)
            body: formData

        });*/

        if (response.ok) {
            const message = coffeeId ? 'Coffee bean updated successfully!' : 'Coffee bean added successfully!';
            authManager.showAlert(message, 'success');

            // Hide modal and reset form
            bootstrap.Modal.getInstance(document.getElementById('coffeeModal')).hide();
            this.resetCoffeeForm();

            // Wait until coffeeApp is ready, then reload beans
            await new Promise((resolve) => {
                const checkCoffeeApp = () => {
                    if (window.coffeeApp && typeof window.coffeeApp.loadCoffeeBeans === 'function') {
                        console.log('✅ coffeeApp found, reloading');
                        resolve();
                    } else {
                        console.warn('⏳ Waiting for coffeeApp to be ready...');
                        setTimeout(checkCoffeeApp, 50);
                    }
                };
                checkCoffeeApp();
            });

            window.coffeeApp.loadCoffeeBeans();

        } else {
            const error = await response.json();
            authManager.showAlert(error.message || 'Failed to save coffee bean', 'danger');
        }
    } catch (error) {
        console.error('Save error:', error);
        authManager.showAlert('Network error. Please try again.', 'danger');
    }
}

    async deleteCoffeeBean(coffeeId) {
    try {
        const response = await fetch(`/api/coffee-beans/${coffeeId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authManager.getToken()}`
            }
        });

        if (response.ok) {
            authManager.showAlert('Coffee bean deleted successfully!', 'success');
            window.coffeeApp.loadCoffeeBeans();
        } else {
            const error = await response.json();
            authManager.showAlert(error.message || 'Failed to delete coffee bean', 'danger');
        }
    } catch (error) {
        console.error('Delete error:', error);
        authManager.showAlert('Network error. Please try again.', 'danger');
    }
}


    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
}

// Initialize modal manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.modalManager = new ModalManager();
});

// Global functions for modal switching
window.switchToRegister = () => {
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    setTimeout(() => {
        window.modalManager.showRegisterModal();
    }, 300);
};

window.switchToLogin = () => {
    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
    setTimeout(() => {
        window.modalManager.showLoginModal();
    }, 300);
};

window.showAddModal = () => {
    if (window.modalManager) {
        window.modalManager.showAddModal();
    }
};