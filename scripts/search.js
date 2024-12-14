import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function search() {
    const searchInput = document.getElementById('productSearch');
    const resultsDiv = document.getElementById('results');
    const closeButton = document.getElementById('sub-menu-close'); // Close button for clearing search

    if (!searchInput) {
        console.error('Search input (#productSearch) not found. Ensure the header is loaded correctly.');
        return;
    }
    if (!resultsDiv) {
        console.error('Results container (#results) not found.');
        return;
    }

    // Function to search for products by name
    function searchProducts(searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return products.filter(product =>
            product.name && product.name.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }

    // Function to display search results
    function displayResults(results) {
        resultsDiv.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            resultsDiv.innerHTML = '<p class="no-results">No products found.</p>';
        } else {
            results.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-item');
                productElement.innerHTML = `
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <p>${product.discountPriceCents ? `$${formatCurrency(product.discountPriceCents)}` : 'Price not available'}</p>
                    </div>
                `;
                resultsDiv.appendChild(productElement);
            });
        }
    }

    // Debounce function to limit search function calls
    function debounce(func, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    }

    // Attach debounced event listener to the search input
    searchInput.addEventListener('input', debounce((event) => {
        const searchTerm = event.target.value.trim();
        if (searchTerm === '') {
            resultsDiv.innerHTML = ''; // Clear results if search input is empty
        } else {
            const searchedProducts = searchProducts(searchTerm);
            displayResults(searchedProducts);
        }
    }, 300));

    // Close button click listener to clear the search input and results
    closeButton.addEventListener('click', () => {
        searchInput.value = ''; // Clear the search input field
        resultsDiv.innerHTML = ''; // Clear the results
    });
}
