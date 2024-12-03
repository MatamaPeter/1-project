import { products } from "./products.js";
import { fetchFiles } from "../scripts/fetchFiles.js";
import { formatCurrency} from "../utils/money.js";

fetchFiles('includes/header.html', '.header-section');

export function getCart() {
    const cartFromStorage = localStorage.getItem('cart');
    return cartFromStorage ? JSON.parse(cartFromStorage) : [];
}


function saveToStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function renderCart() {
            const cart = getCart(); // Fetch the latest cart from localStorage
            const newCartQuantity = cart.reduce((total, item) => item.quantity + total, 0); // Calculate the total quantity
            document.querySelector('.cart span').innerHTML = newCartQuantity; // Update the displayed cart quantity
}
export const cart = JSON.parse(localStorage.getItem('cart')) || [];
export function addToCart() {
    const buttons = document.querySelectorAll('.shop-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const quantity = e.target.parentNode.querySelector('select').value;

            // Check if productId and quantity are valid
            if (!productId || !quantity) {
                console.error('Product ID or quantity is missing!');
                return;
            }

            // Find the product in the products array
            const product = products.find((product) => product.id === productId);
            if (!product) {
                console.error('Product not found!');
                return;
            }

            // Get the current cart from localStorage
            const cart = getCart();

            // Find the product in the cart array
            const cartItem = cart.find((item) => item.id === productId);

            if (cartItem) {
                // Update quantity if item already exists in cart
                cartItem.quantity += parseInt(quantity);
            } else {
                // Add new item to the cart
                cart.push({
                    id: productId, // Ensure key name consistency
                    quantity: parseInt(quantity),
                });

            }

            // Save the updated cart to localStorage
            saveToStorage(cart);

            // Show a message that the product was added to the cart
            const productContainer = e.target.closest('.shop-product');
            const postAddedToCart = productContainer.querySelector('.added-message');
            postAddedToCart.innerHTML = `
                <i class="material-icons">check_circle</i>
                <span>Added to Cart</span>`;
            
            setTimeout(() => {
                postAddedToCart.innerHTML = ``;
            }, 1000);

            const selectElement = e.target.parentNode.querySelector('select');
            selectElement.value = '1'; // Reset the dropdown to 1
                         
            renderCart();
           

        });
    });
}



let cartHTML = '';
cart.forEach(cartItem => {
    const product = products.find(product => product.id === cartItem.id);
    
    
    cartHTML += 
    
        `
            <div class="card-left">
                <div class="cart-item-image">
                    ${product.image}
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
                        <button class="shop-button">Update</button>
                    </div>
                </div>
                <div class="cart-item-remove">
                    <button class="delete-cart-item">Delete</button>
                </div>
            </div>

        `
    
})
console.log(cartHTML);
