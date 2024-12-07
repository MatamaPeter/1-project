import { cart, renderCart } from './cart.js'; // Make sure renderCart is imported correctly
import { products } from './products.js';
import { formatCurrency } from "../utils/money.js";
import { updateTotal } from '../scripts/checkout.js';

// Generate the cart HTML
function generateCart() {
    let cartHTML = '';
    cart.forEach(cartItem => {
        const product = products.find(product => product.id === cartItem.id);    
        cartHTML += `
            <div class="cart-item">
                <div class="card-left">
                    <div class="cart-item-image">
                        <img src="images/products/${product.image}" alt="${product.name}">
                    </div>
                    <div class="cart-item-name-price">
                        <div class="cart-item-name">
                            ${product.name}
                        </div>
                        <div class="cart-item-price">
                            <div class="discounted-price">
                                $${formatCurrency(product.discountPriceCents)}
                            </div>
                            <div class="marked-price">
                                $${formatCurrency(product.markedPriceCents)}
                            </div>
                        </div>
                        <div class="cart-updated-message"></div>
                    </div>
                </div>
                <div class="card-right">
                    <div class="cart-item-quantity">
                        <div class="qty-price">
                            <select name="quantity" id="">
                                <option value="${cartItem.quantity}">${cartItem.quantity}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button data-product-id="${cartItem.id}" class="shop-button">Update</button>
                        </div>
                    </div>
                    <div class="cart-item-remove">
                        <button data-product-id="${cartItem.id}"  class="delete-cart-item">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
    if (cartHTML.length !== 0) {
        document.querySelector('.cart-items').innerHTML = cartHTML;
    } else {
        document.querySelector('.cart-items').innerHTML = 'Your cart is empty';

    }
}

// Call renderCart when the page loads to update the cart quantity display
// Display the cart number on page load

// Generate the cart display on page load
generateCart();

// Function to update the cart item when quantity is changed
function updateCartItem() {
    document.querySelector('.cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('shop-button')) {
            const productId = e.target.dataset.productId;
            const cartItemElement = e.target.closest('.cart-item');
            const selectElement = cartItemElement.querySelector('select');
            const quantity = selectElement ? selectElement.value : 1; 
            const cartItem = cart.find(item => item.id === productId);
            
            if (cartItem) {
                cartItem.quantity = parseInt(quantity, 10); // Update cart item quantity
                localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
                generateCart(); // Regenerate the cart with updated quantities

                // Delay to allow DOM to update
                setTimeout(() => {
                    const updatedCartItemElement = document.querySelector(`.cart-item [data-product-id="${productId}"]`).closest('.cart-item');
                    const postUpdatedCart = updatedCartItemElement.querySelector('.cart-updated-message');
                    
                    postUpdatedCart.innerHTML = `
                        <i class="material-icons">check_circle</i>
                        <span>Cart updated</span>`;
                    
                    postUpdatedCart.style.opacity = 1;
                    setTimeout(() => {
                        postUpdatedCart.style.opacity = 0;
                    }, 1000);
                }, 0);

                // Recalculate the total and update the display
                updateTotal();  // Call the updateTotal function to refresh the total
                renderCart();  // This updates the cart quantity (in the cart icon, for example)
            }
        }
    });
}

updateCartItem();

function deleteFromCart() {
    document.querySelector('.cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-cart-item')) {
            const productId = e.target.dataset.productId;
            
            // Get the current cart from local storage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Create a new cart excluding the deleted item
            const newCart = cart.filter((cartItem) => cartItem.id !== productId);
            
            // Update the local storage with the new cart
            localStorage.setItem('cart', JSON.stringify(newCart));

            // Ensure the global cart is updated
            cart.splice(0, cart.length, ...newCart);

            // Immediately remove the cart item from the DOM
            const cartItemToRemove = e.target.closest('.cart-item');
            if (cartItemToRemove) {
                cartItemToRemove.remove();
            }

            // Re-render the cart and update the total after deletion
            updateTotal();
            renderCart();

            // If cart is empty, show an empty cart message
            if (newCart.length === 0) {
                // Safely remove sections
                document.querySelector('.delivery-section')?.remove();
                document.querySelector('.payment-summary')?.remove();

                const cartItemsContainer = document.querySelector('.cart-items');
                if (cartItemsContainer) {
                    cartItemsContainer.innerHTML = `
                        <div class="empty-cart-message">
                            <p>Your cart is empty</p>
                        </div>
                    `;
                }
            }
        }
    });
}

deleteFromCart();

window.onload = renderCart;