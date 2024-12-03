import { addToCart, cart,renderCart } from './cart.js';
import { products } from './products.js';
import { formatCurrency} from "../utils/money.js";

function generateCart(){
let cartHTML = '';
cart.forEach(cartItem => {
    const product = products.find(product => product.id === cartItem.id);    
    cartHTML += 
    
        `<div class ="cart-item">
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
                    <div class="cart-updated-message">
                        
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
                        <button data-product-id="${cartItem.id}" class="shop-button">Update</button>
                    </div>
                </div>
                <div class="cart-item-remove">
                    <button class="delete-cart-item">Delete</button>
                </div>
            </div>
        </div>

        `
    
})
document.querySelector('.cart-items').innerHTML = cartHTML;
    
}
generateCart()


function updateCartItem() {
    document.querySelector('.cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('shop-button')) {
            const productId = e.target.dataset.productId;
            const cartItemElement = e.target.closest('.cart-item');
            const selectElement = cartItemElement.querySelector('select');
            const quantity = selectElement ? selectElement.value : 1; 
            const cartItem = cart.find(item => item.id === productId);
            
            if (cartItem) {
                cartItem.quantity = parseInt(quantity, 10); 
                localStorage.setItem('cart', JSON.stringify(cart));
                generateCart();
                
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
            }
        }
    });

   
}
updateCartItem();

