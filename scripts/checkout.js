import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
document.addEventListener('DOMContentLoaded', function () {

    let subtotal = 0;

    cart.forEach((cartItem) => {
        const product = products.find((product) => product.id === cartItem.id);
        subtotal += (product.discountPriceCents * cartItem.quantity);
    });

    const tax = (subtotal * 0.1);
    const total = subtotal + tax;

    // Render the payment summary with the correct shipping cost
    document.querySelector('.payment-summary').innerHTML = `
    <div class="payment-header">
        <h3>Payment Summary</h3> 
    </div>
    <div class="payment-body">
        <div class="payment-body-left">
            <div class="sub-total"><p>Subtotal:</p>$${formatCurrency(subtotal)}</div>
            <div class="tax"><p>Tax(10%):</p>$${formatCurrency(tax)}</div>
            <div class="shipping"><p>Shipping:</p><span class="shipping-cost">0</span></div>
            <hr>
            <div class="total"><p>Total:</p>$${formatCurrency(total)}</div>
            <hr>
            <div class="payment-method">
                <h3>Payment Method:</h3>
                <label for="Mpesa">
                        <input type="radio" name="payment-method" id="" checked> <span>Mpesa</span>
                </label>
                <label for="phone no">
                    <input class="payment-no" type="text" name="" id="" placeholder="Enter your phone number">
                </label>
                <label for="COD">
                    <input type="radio" name="payment-method" id="" > <span>Cash on delivery</span>
                </label>
                <div class="checkout-btn">
                    <button class="btn btn-primary">Checkout</button>
                </div>
            </div>
        </div>
    </div>
`;
});