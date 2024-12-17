<?php
    session_start();
    $user = $_SESSION['user'];
?>

<div id="submenu" class="submenu">
    <i id="sub-menu-close" class="submenu-close material-icons">cancel</i>
    <ul>
        <li>Cart</li>
        <li>Checkout</li>
        <li>Login</li>
        <li>Profile</li>
        <li>Contacts</li>
    </ul>
</div>

<div class="delivery-contacts">
    <div class="delivery">
        <i class="material-icons">local_shipping</i>
        <span>Fast and timely delivery</span>
    </div>
    <div class="contacts">
        <div class="phone">
            <i class="material-icons">phone</i>
            <span>+254 712 345 678</span>
        </div>
        <div class="email">
            <i class="material-icons">email</i>
            <span>info@email.com</span>
        </div>
    </div>
</div>

<div class="header-container">
    <div class="header">
        <div class="logo">
            <a href="index.php">
                <img src="images/logo.png" alt="Epicks Logo">
                <span>Epicks</span>
            </a>
        </div>

        <div class="searchbar-results">
            <div class="search">
                <input type="search" id="productSearch" placeholder="Search for products...">
                <button class="search-btn">
                    <i class="material-icons">search</i>
                </button>
            </div>
            <div id="results" class="search-results"></div>
        </div>

        <div class="cart-profile">
            <div class="profile">
                <?php 
                if (!empty($user)) { ?>
                <a href="auth/profile.php">
                    <i class="material-icons">account_circle</i>
                    <span>
                        <?php echo htmlspecialchars($user); ?>
                    </span>
                </a>
                <?php } else { ?>
                <a href="auth/login.php">
                    <i class="material-icons">account_circle</i>
                    <span>Login / Register</span>
                </a>
                <?php } ?>
            </div>

            <a href="cart.html">
                <div class="cart">
                    <i class="material-icons">shopping_cart</i>
                    <span>0</span>
                </div>
            </a>
        </div>
    </div>

    <div class="search-2">
        <i id="menu-open-btn" class="submenu-open material-icons">menu</i>
        <input type="search" placeholder="Search...">
        <button class="search-btn">
            <i class="material-icons">search</i>
        </button>
    </div>
</div>