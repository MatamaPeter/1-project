<?php
include('../includes/config.php');

$message = '';  // Variable to hold error/success message

if (isset($_POST['register_btn'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password !== $confirm_password) {
        $message = "Passwords do not match!";
    } else {
        $stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $message = "Email already exists.";
        } else {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $username, $email, $hashed_password);
            if ($stmt->execute()) {
                $message = "Registration successful!";
            } else {
                $message = "Error: Could not register.";
            }
        }
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

    <title>Register - Epicks</title>
</head>

<body>
    <div class="login">
        <div class="login-header">
            <img src="../images/logo.png" alt="Logo">
            <h5>Epicks</h5>
        </div>

        <!-- Display message between the logo and the HR -->
        <?php if (!empty($message)) : ?>
            <div class="message"><?php echo $message; ?></div>
        <?php endif; ?>

        <hr>

        <!-- Registration Form -->
        <form action="" method="post">
            <div class="input-container">
                <input type="text" id="full-name" name="username" placeholder=" " required>
                <label for="full-name">Full Name</label>
                <i class="fas fa-user"></i>
            </div>
            <div class="input-container">
                <input type="email" id="email" name="email" placeholder=" " required>
                <label for="email">Email Address</label>
                <i class="fas fa-envelope"></i>
            </div>
            <div class="input-container">
                <input type="password" id="password" name="password" placeholder=" " required>
                <label for="password">Password</label>
                <i class="fas fa-lock"></i>
            </div>
            <div class="input-container">
                <input type="password" id="confirm-password" name="confirm_password" placeholder=" " required>
                <label for="confirm-password">Confirm Password</label>
                <i class="fas fa-lock"></i>
            </div>
            <button name="register_btn">Register</button>
            <div class="forgot-password">
                <a href="login.html">Already have an account?</a> | <a href="login.html">Login</a>
            </div>
        </form>
    </div>

    <!-- Font Awesome for Icons -->
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</body>

</html>