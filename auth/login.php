<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../styles/register-login.css">
        <title>Login</title>
    </head>

    <body>
        <div class="login">
            <div class="login-header">
                <img src="../images/logo.png" alt="Logo">
                <h5>Epicks</h5>
            </div>
            <hr>
            <div class="input-container">
                <input type="text" id="username" placeholder=" " required>
                <label for="username">Enter your name</label>
                <i class="fas fa-user"></i>
            </div>
            <div class="input-container">
                <input type="password" id="password" placeholder=" " required>
                <label for="password">Password</label>
                <i class="fas fa-lock"></i>
            </div>
            <button>Login</button>
            <div class="forgot-password">
                <a href="#">Forgot password?</a> | <a href="register.html">Register</a>
            </div>
        </div>

        <!-- Font Awesome for Icons -->
        <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    </body>

</html>