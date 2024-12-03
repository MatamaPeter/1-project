import { cart } from './cart.js';
import { products } from './products.js';
import { formatCurrency} from "../utils/money.js";


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
        </div>

        `
    
})
document.querySelector('.cart-items').innerHTML = cartHTML;
