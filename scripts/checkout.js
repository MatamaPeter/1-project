import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";

// Function to calculate and update the total
export function updateTotal() {
    // Retrieve the most up-to-date cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let subtotal = 0;

    // Calculate the subtotal using the cart from localStorage
    currentCart.forEach((cartItem) => {
        const product = products.find((product) => product.id === cartItem.id);
        if (product) {
            subtotal += product.discountPriceCents * cartItem.quantity;
        }
    });

    // Retrieve shipping cost from localStorage, default to 0 if not found
    const savedShippingCost = parseFloat(localStorage.getItem("shippingCost") || 0);

    // Calculate tax (10%)
    const tax = subtotal * 0.1;
    const total = subtotal + tax + savedShippingCost;

    // Select the payment summary element
    const paymentSummaryElement = document.querySelector(".payment-summary");

    // Only update if the payment summary element exists
    if (paymentSummaryElement) {
        paymentSummaryElement.innerHTML = `
        <div class="payment-header">
            <h3>Payment Summary</h3> 
        </div>
        <div class="payment-body">
            <div class="payment-body-left">
                <div class="sub-total"><p>Subtotal:</p>$${formatCurrency(subtotal)}</div>
                <div class="tax"><p>Tax (10%):</p>$${formatCurrency(tax)}</div>
                <div class="shipping"><p>Shipping:</p><span class="shipping-cost">$${formatCurrency(savedShippingCost)}</span></div>
                <hr>
                <div class="total"><p>Total:</p>$${formatCurrency(total)}</div>
                <hr>
                <div class="payment-method">
                    <h3>Payment Method:</h3>
                    <label>
                        <input type="radio" name="payment-method" checked> <span>Mpesa</span>
                    </label>
                    <label>
                        <input type="text" placeholder="Enter your phone number" class="payment-no">
                    </label>
                    <label>
                        <input type="radio" name="payment-method"> <span>Cash on Delivery</span>
                    </label>
                    <div class="checkout-btn">
                        <button class="btn btn-primary">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    // Return the calculated total for potential use elsewhere
    return total;
}

// Call updateTotal to initially render the payment summary when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateTotal(); // Calculate and render the total when the page is loaded
});

// Listen for shipping cost updates
document.addEventListener("shippingCostUpdated", (event) => {
    const updatedShippingCost = event.detail.shippingCost;

    // Update shipping cost display
    const shippingCostElement = document.querySelector(".shipping-cost");
    if (shippingCostElement) {
        shippingCostElement.textContent = `$${formatCurrency(updatedShippingCost)}`;
    }

    // Recalculate total
    updateTotal(); // Recalculate and update the total after shipping cost changes
});