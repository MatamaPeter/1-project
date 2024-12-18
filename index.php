<?php

session_start();
$user = $_SESSION['user'];

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="styles/style.css">
    <link rel="shortcut icon" href="images/favicon/image.png">
    <title>Epicks Online Shop</title>
</head>

<body>

    <!-- Header section -->
    <div class="header-section">

    </div>
    <!-- Header section -->


    <!-- Hero-section -->
    <div class="hero-section">
        <div class="categories">
            <p>Categories</p>
            <ul>
                <hr>
                <li>Electronics</li>
                <hr>
                <li>Beverages</li>
                <hr>
                <li>Accessories</li>
                <hr>
                <li>Health & Beauty</li>
                <hr>
                <li>Footwear</li>
                <hr>
                <li>Bags & Accessories</li>
                <hr>
                <li>Groceries</li>
                <hr>

            </ul>
        </div>
        <div class="carousel">
            <div class="carousel-images" id="carouselImages">
                <img src="images/carousel/image1.jpg" alt="Image 1">
                <img src="images/carousel/image2.jpg" alt="Image 2">
                <img src="images/carousel/image3.jpg" alt="Image 3">


            </div>
            <button class="carousel-button left" id="prevBtn">&#10094;</button>
            <button class="carousel-button right" id="nextBtn">&#10095;</button>
        </div>

        <div class="carousel-dots" id="carouselDots"></div>

        <div class="ad-poster">
            <img src="images/ads/Schweppes.jpeg" alt="">

        </div>
    </div>
    <!-- Hero-section -->

    <!-- shop Section -->
    <div class="shop-section">
        <div class="shop-header">
            <p>Discover the latest products</p>
        </div>
        <hr>
        <div class="shop-products">

        </div>
    </div>
    <!-- shop Section -->


    <!-- footer section -->
    <div class="footer-section">

    </div>

    <!-- footer section -->

    <script type="module" src="scripts/index.js"></script>


</body>

</html>