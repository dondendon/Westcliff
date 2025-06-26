// Main application logic
class CoffeeApp {
    constructor() {
        this.coffeeBeans = [];
        this.filteredBeans = [];
        this.currentFilters = {
            search: '',
            rating: '',
            sort: '-createdAt'
        };
        this.init();
    }

    init() {
        this.bindEvents();
        // Load coffee beans if user is authenticated
        if (authManager.isAuthenticated()) {
            this.loadCoffeeBeans();
            console.log('CoffeeApp initialized');

        }
    }

    bindEvents() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.applyFilters();
            });
        }

        // Rating filter
        const ratingFilter = document.getElementById('ratingFilter');
        if (ratingFilter) {
            ratingFilter.addEventListener('change', (e) => {
                this.currentFilters.rating = e.target.value;
                this.applyFilters();
            });
        }

        // Sort filter
        const sortBy = document.getElementById('sortBy');
        if (sortBy) {
            sortBy.addEventListener('change', (e) => {
                this.currentFilters.sort = e.target.value;
                this.applyFilters();
            });
        }
        document.getElementById('sortBy').addEventListener('change', (e) => {
            console.log('Sorting by:', e.target.value);
        });
    }

    async loadCoffeeBeans() {
        try {
            const queryParams = new URLSearchParams({
                sort: this.currentFilters.sort,
                ...(this.currentFilters.search && { search: this.currentFilters.search }),
                ...(this.currentFilters.rating && { rating: this.currentFilters.rating })
            });

            const response = await fetch(`/api/coffee-beans?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${authManager.getToken()}`
                }
            });

            if (response.ok) {
                this.coffeeBeans = await response.json();
                this.filteredBeans = [...this.coffeeBeans];
                this.renderCoffeeBeans();
            } else if (response.status === 401) {
                authManager.logout();
            } else {
                console.error('Failed to load coffee beans');
                this.showError('Failed to load coffee beans');
            }
        } catch (error) {
            console.error('Load error:', error);
            this.showError('Network error while loading coffee beans');
        }
    }

    applyFilters() {
        let filtered = [...this.coffeeBeans];

        // Apply search filter
        if (this.currentFilters.search) {
            const searchTerm = this.currentFilters.search.toLowerCase();
            filtered = filtered.filter(bean => 
                bean.brand.toLowerCase().includes(searchTerm) ||
                (bean.origin && bean.origin.toLowerCase().includes(searchTerm)) ||
                bean.flavorProfile.some(flavor => flavor.toLowerCase().includes(searchTerm))
            );
        }

        // Apply rating filter
        if (this.currentFilters.rating) {
            filtered = filtered.filter(bean => bean.rating === parseInt(this.currentFilters.rating));
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (this.currentFilters.sort) {
                case 'createdAt':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case '-createdAt':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'rating':
                    return a.rating - b.rating;
                case '-rating':
                    return b.rating - a.rating;
                case 'brand':
                    return a.brand.localeCompare(b.brand);
                case 'price':
                    return a.price - b.price;
                case '-price':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        this.filteredBeans = filtered;
        this.renderCoffeeBeans();
    }

    renderCoffeeBeans() {
        const container = document.getElementById('coffeeBeansContainer');
        if (!container) return;

        if (this.filteredBeans.length === 0) {
            container.innerHTML = this.renderEmptyState();
            return;
        }

        const cardsHTML = this.filteredBeans.map(bean => this.renderCoffeeBeanCard(bean)).join('');
        container.innerHTML = cardsHTML;
    }

renderCoffeeBeanCard(bean) {
    const dateAdded = new Date(bean.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return `
      <div class="coffee-card">
        ${bean.imageUrl 
            ? `<img src="${bean.imageUrl}" alt="${bean.brand}" class="coffee-img mb-2">` 
            : `<div class="coffee-img-placeholder">No image available</div>`
        }
        <p><strong>Brand:</strong> ${bean.brand || 'Unknown'}</p>
        <p><strong>Origin:</strong> ${bean.origin || 'Unknown'}</p>
        <p><strong>Flavors:</strong> ${bean.flavorProfile.join(', ')}</p>
        <p><strong>Rating:</strong> ${bean.rating}/5</p>
        <p><strong>Price:</strong> $${bean.price}</p>
        <p><strong>Added:</strong> ${dateAdded}</p>
        <button onclick="coffeeApp.editCoffeeBean('${bean._id}')">Edit</button>
        <button onclick="coffeeApp.deleteCoffeeBean('${bean._id}')">Delete</button>
      </div>
    `;
}



async addCoffeeBean(beanData) {
  const response = await fetch('/api/coffee-beans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authManager.getToken()}`
    },
    body: JSON.stringify(beanData)
  });
  if (response.ok) {
    const newBean = await response.json();
    this.coffeeBeans.push(newBean);
    this.applyFilters();
  } else {
    console.error('Add failed');
  }
}



async editCoffeeBean(beanId) {
    try {
        const response = await fetch(`/api/coffee-beans/${beanId}`, {
            headers: {
                'Authorization': `Bearer ${authManager.getToken()}`
            }
        });

        if (response.ok) {
            const bean = await response.json();
            // Reuse the modalManager to show the edit modal
            modalManager.showEditModal(bean);
        } else {
            const error = await response.json();
            authManager.showAlert(error.message || 'Failed to load coffee bean', 'danger');
        }
    } catch (error) {
        console.error('Edit fetch error:', error);
        authManager.showAlert('Network error while loading coffee bean', 'danger');
    }
}

async deleteCoffeeBean(beanId) {
    try {
        const response = await fetch(`/api/coffee-beans/${beanId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authManager.getToken()}`
            }
        });

        if (response.ok) {
            authManager.showAlert('Coffee bean deleted successfully!', 'success');
            await this.loadCoffeeBeans(); // refresh the list
        } else {
            const error = await response.json();
            authManager.showAlert(error.message || 'Failed to delete coffee bean', 'danger');
        }
    } catch (error) {
        console.error('Delete error:', error);
        authManager.showAlert('Network error while deleting coffee bean', 'danger');
    }
}
renderEmptyState() {
    return `
        <div class="no-results text-center p-4">
            <p>No results found.</p>
        </div>
    `;
}




}



document.addEventListener('DOMContentLoaded', () => {
  window.coffeeApp = new CoffeeApp();
});

