import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addToCart, renderCart } from "../data/cart.js";
import { fetchFiles } from "./fetchFiles.js";
import { groupedByCategory } from "../data/products.js";
import { search } from "./search.js";


fetchFiles('includes/header.php', '.header-section').then(() => {
    
    search();

        
        const subMenuOpen = document.getElementById('menu-open-btn');
        const subMenuClass = document.getElementById('submenu');
        
        

        subMenuOpen.addEventListener('click', () => {
            subMenuClass.classList.toggle('open-submenu');
        });

        const subMenuClose = document.getElementById('sub-menu-close');
        subMenuClose.addEventListener('click', () => {
            subMenuClass.classList.remove('open-submenu');
        })
    


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

    
// Function to generate the product HTML
function generateProductHTML(product) {
    return `
        <div class="shop-product">
            <img src="images/products/${product.image}" alt="${product.name}">
            <div class="price-desc">
                <div class="price">
                    <h3>$${formatCurrency(product.discountPriceCents)}</h3>
                    <span>$${formatCurrency(product.markedPriceCents)}</span>
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
            <div class="added-message"></div>
        </div>
    `;
}

// Function to render products (either all or filtered by category)
function renderProductsOrCategory(productsData) {
    let productsHTML = '';
    productsData.forEach((product) => {
        productsHTML += generateProductHTML(product);
    });
    document.querySelector('.shop-products').innerHTML = productsHTML;
}

// Function to render all products
function renderProducts() {
    renderProductsOrCategory(products);
}

// Function to render products by category
function renderCategory(groupedByCategory, category) {
    if (groupedByCategory[category]) {
        renderProductsOrCategory(groupedByCategory[category]);
                addToCart();

    }
}

// Handle category selection and rendering
const categoryDiv = document.querySelectorAll('.categories ul li');
categoryDiv.forEach((category) => {
    category.addEventListener('click', () => {
        document.querySelector('.shop-header p').innerHTML = category.textContent;
        renderCategory(groupedByCategory, category.innerText); // Filter by category
    });
});

// Initial render of all products when page loads
renderProducts();

addToCart();
renderCart();

});