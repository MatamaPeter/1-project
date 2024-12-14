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
            <div class="cart-item" data-product-id="${cartItem.id}">
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

    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        if (cart.length !== 0) {
            cartItemsContainer.innerHTML = cartHTML;
        } else {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message"><p>Your cart is empty</p></div>';
        }
    }
}

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
            
            // Find the index of the cart item
            const cartItemIndex = cart.findIndex(item => item.id === productId);
            
            if (cartItemIndex !== -1) {
                // Update the specific cart item
                cart[cartItemIndex].quantity = parseInt(quantity, 10);
                
                // Save updated cart to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Regenerate the cart
                generateCart();
                
                // Delay to show update message
                setTimeout(() => {
                    const updatedCartItemElement = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
                    const postUpdatedCart = updatedCartItemElement?.querySelector('.cart-updated-message');
                    
                    if (postUpdatedCart) {
                        postUpdatedCart.innerHTML = `
                            <i class="material-icons">check_circle</i>
                            <span>Cart updated</span>
                        `;
                        
                        postUpdatedCart.style.opacity = 1;
                        setTimeout(() => {
                            postUpdatedCart.style.opacity = 0;
                        }, 1000);
                    }
                }, 0);

                // Recalculate the total and update the display
                updateTotal();
                renderCart();
            }
        }
    });
}

updateCartItem();

function deleteFromCart() {
    document.querySelector('.cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-cart-item')) {
            const productId = e.target.dataset.productId;
            
            // Remove the item from the cart array
            const cartIndex = cart.findIndex(item => item.id === productId);
            
            if (cartIndex !== -1) {
                cart.splice(cartIndex, 1);
                
                // Update local storage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Regenerate the cart
                generateCart();

                // Update total and cart render
                updateTotal();
                renderCart();

                // Check if cart is empty
                if (cart.length === 0) {
                    // Remove delivery and payment sections
                    document.querySelector('.delivery-section')?.remove();
                    document.querySelector('.payment-summary')?.remove();
                }
            }
        }
    });
}

deleteFromCart();

window.onload = renderCart;