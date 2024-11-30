import { addToCart, renderCart, getCart } from '../../data/cart.js';
import { products } from '../../data/products.js';

describe('addToCart()', () => {
    beforeEach(() => {
        // Mock localStorage
        const storage = {};
        spyOn(localStorage, 'getItem').and.callFake((key) => storage[key] || null);
        spyOn(localStorage, 'setItem').and.callFake((key, value) => { storage[key] = value; });

        // Mock the products array
        products.length = 0; // Clear existing products
        products.push({ id: "1", name: "Test Product 1", price: 10 });
    });

    it('should add a new product to the cart', () => {
        // Simulate adding a new product
        const productId = "1";
        const quantity = 1;

        const cart = getCart(); // Ensure the cart starts empty
        expect(cart.length).toBe(0);

        // Add product to cart
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({ id: productId, quantity });
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Verify the cart
        const updatedCart = getCart();
        expect(updatedCart.length).toBe(1);
        expect(updatedCart[0].id).toBe(productId);
        expect(updatedCart[0].quantity).toBe(quantity);
    });

    it('should update the quantity of an existing product in the cart', () => {
        // Prepopulate the cart
        const productId = "1";
        const initialCart = [{ id: productId, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(initialCart));

        // Simulate adding the same product again
        const quantity = 2; // Additional quantity
        const cart = getCart();

        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Verify the cart
        const updatedCart = getCart();
        expect(updatedCart.length).toBe(1);
        expect(updatedCart[0].id).toBe(productId);
        expect(updatedCart[0].quantity).toBe(3); // Updated quantity
    });
});
