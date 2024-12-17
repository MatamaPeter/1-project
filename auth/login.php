<?php
session_start();
unset($_SESSION['user']);

include("../includes/config.php");

$message ='';

if (isset($_POST['login_btn'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare('SELECT * FROM users WHERE email =?');
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $user_result = $stmt->get_result();

    if ($user_result->num_rows !== 0) {
        $row = $user_result->fetch_assoc();
        $hashed_password = $row['password'];

        if (password_verify($password, $hashed_password)) {
            $selected_user = $row['name'];
            $_SESSION['user'] = $selected_user;
            header('Location: ../index.html');
            exit;
        } else {
            $message = '<i class="fas fa-times-circle"></i> Invalid Credentials';
        }
    }else{
        $message = '<i class="fas fa-times-circle"></i> User not found';
    }
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/register-login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"> <!-- Font Awesome CDN -->

    <title>Login - Epicks</title>
</head>

<body>
    <div class="login">
        <div class="login-header">
            <img src="../images/logo.png" alt="Logo">
            <h5>Epicks</h5>
        </div>
        <?php if (!empty($message)) : ?>
            <div class="message"><?php echo $message; ?></div>
        <?php endif; ?>
        <hr>
        <form action="" method="post">
            <div class="input-container">
                <input type="email" id="username" name="email" placeholder=" " required>
                <label for="username">Enter your email</label>
                <i class="fas fa-user"></i>
            </div>
            <div class="input-container">
                <input type="password" name="password" id="password" placeholder=" " required>
                <label for="password">Password</label>
                <i class="fas fa-lock"></i>
            </div>
            <button name="login_btn">Login</button>
            <div class="forgot-password">
                <a href="#">Forgot password?</a> | <a href="register.php">Register</a>
            </div>
        </form>
    </div>

    <!-- Font Awesome for Icons -->
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</body>

</html>