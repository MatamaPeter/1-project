import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { cart } from "../data/cart.js";

document.addEventListener('DOMContentLoaded', () => {
        const subMenuOpen = document.getElementById('menu-open-btn');
        const subMenuClass = document.getElementById('submenu');

        subMenuOpen.addEventListener('click', () => {
            subMenuClass.classList.toggle('open-submenu');
        });

        const subMenuClose = document.getElementById('sub-menu-close');
        subMenuClose.addEventListener('click', () => {
            subMenuClass.classList.remove('open-submenu');
        })
    });

document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;

    const images = document.querySelectorAll('#carouselImages img');
    const totalImages = images.length;

    
    const dotsContainer = document.getElementById('carouselDots');
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentIndex = i; 
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }

    const updateDots = () => {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const updateCarousel = () => {
        const carouselImages = document.getElementById('carouselImages');
        const offset = -currentIndex * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;
        updateDots(); 
    };

    const nextImage = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    };

    const prevImage = () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    };

    setInterval(nextImage, 5000);

    document.getElementById('nextBtn').addEventListener('click', nextImage);
    document.getElementById('prevBtn').addEventListener('click', prevImage);
 });
    
let productsHTML = '';
function renderProducts (){
    products.forEach((product) => {
        productsHTML += `
            <div class="shop-product">
                <img src="${product.image}" alt="Product 5">
                <div class="price-desc">
                    <div class="price">
                        <h3>$${formatCurrency(product.discountPriceCents)}</h3><span>$${formatCurrency(product.markedPriceCents)}</span>
                    </div>
                    <p>${product.name}</p>
                </div>
            <div class="qty-price">
                <select name="quantity" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button data-product-id="${product.id}" class="shop-button">Add to Cart</button>
            </div>
            

            </div>
        `
    })
}
renderProducts();
document.querySelector('.shop-products').innerHTML = productsHTML;

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart() {
    const buttons = document.querySelectorAll('.shop-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const quantity = e.target.parentNode.querySelector('select').value;
            
            // Find the product in the products array
            const product = products.find((product) => product.id === productId);
            
            // Find the product in the cart array
            const cartItem = cart.find((item) => item.productId === productId);

            if (cartItem) {
                // Update quantity if item already exists in cart
                cartItem.quantity += parseInt(quantity);
            } else {
                // Add new item to the cart
                cart.push({
                    productId,
                    quantity: parseInt(quantity),
                });
            }

            // Save the updated cart to localStorage
            saveToStorage();

            // Optional: Log the cart after each update (for debugging)
            console.log(cart);
        });
    });
}

// Call the function to add event listeners
addToCart();
