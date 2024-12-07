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
                        <input id="payment-method-mpesa" type="radio" name="payment-method" checked> <span>Mpesa</span>
                    </label>
                    <div id="mpesa-phone-field" class="mpesa-phone-field">
                        <label>
                            <input type="text" placeholder="Enter your phone number" class="payment-no">
                        </label>
                        <div class="stk-na">
                            STK not pushing? <span id="use-paybill" style="cursor: pointer; color: blue; text-decoration: underline;">use paybill</span>
                        </div>
                        <h5 class="payment-instructions" style="display: none;">
                           <p> 1. Go to Mpesa.</p>
                           <p> 2. Select paybill.</p>
                           <p> 3. Enter paybill <b>123456</b></p>
                           <p> 4. Enter A/c no. as your names with no space e.g. <b>petermatama.</b></p>
                           <p> 5. Enter amount. <b>$${formatCurrency(total)}</b></p>
                        </h5>
                    </div>
                    <label>
                        <input id="payment-method-COD" type="radio" name="payment-method"> <span>Cash on Delivery</span>
                    </label>
                    <div class="checkout-btn">
                        <button class="btn btn-primary">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for payment method selection
    const mpesaRadio = document.getElementById('payment-method-mpesa');
    const codRadio = document.getElementById('payment-method-COD');
    const mpesaPhoneField = document.getElementById('mpesa-phone-field');
    const usePaybill = document.getElementById('use-paybill');
    const paymentInstructions = document.querySelector('.payment-instructions');

    // Initially show phone field (since Mpesa is checked by default)
    mpesaPhoneField.style.display = 'block';

    // Add event listeners to toggle phone field visibility
    mpesaRadio.addEventListener('change', () => {
        mpesaPhoneField.style.display = 'block';
        paymentInstructions.style.display = 'none'; // Hide payment instructions when switching back to Mpesa
    });

    codRadio.addEventListener('change', () => {
        mpesaPhoneField.style.display = 'none';
        paymentInstructions.style.display = 'none'; // Hide payment instructions when switching to COD
    });

    // Show payment instructions when "use paybill" is clicked
    usePaybill.addEventListener('click', () => {
        paymentInstructions.style.display = 'block'; // Show payment instructions
    });
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