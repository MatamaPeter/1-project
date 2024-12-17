<?php


include('../includes/config.php');

$message = ''; // Initialize message

if (isset($_POST['register_btn'])) {
    // Sanitize input
    $username = htmlspecialchars(trim($_POST['username']));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $time = date('Y-m-d H:i:s');

    // Validate password match
    if ($password !== $confirm_password) {
        $message = '<i class="fas fa-times-circle"></i> Passwords do not match!';
    } else {
        // Check if email already exists
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $message = '<i class="fas fa-times-circle"></i> Email already exists.';
        } else {
            // Hash password and insert into database
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Insert user
            $stmt = $conn->prepare("INSERT INTO users (create_time, name, email, password) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $time, $username, $email, $hashed_password);

            if ($stmt->execute()) {
                // Display success message with redirection
                $message = '
                    <i class="fas fa-check-circle"></i> Success! 
                    Redirecting login<span class="dots">...</span>
                    <script>
                        setTimeout(function() {
                            window.location.href = "login.php";
                        }, 3000);
                    </script>
                ';
            } else {
                $message = '<i class="fas fa-times-circle"></i> Error: Could not register. Please try again later.';
                error_log("Registration Error: " . $stmt->error); // Log error
            }
        }
        $stmt->close();
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
                <a href="login.html">Already have an account?</a> | <a href="login.php">Login</a>
            </div>
        </form>
    </div>

    <!-- Font Awesome for Icons -->
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</body>

</html>