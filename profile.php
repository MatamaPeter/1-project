<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

$user = $_SESSION['user'];
include('./includes/config.php');

$stmt = $conn->prepare("SELECT * FROM users WHERE name = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

$userData = $result->fetch_assoc();
$userName = $userData['name'];
$userEmail = $userData['email'];
$userPhone = $userData['Phone'];
$userPassword = $userData['password'];

$message = '';

if (isset($_POST['save-changes'])) {
    $new_name = htmlspecialchars(trim($_POST['username']));
    $new_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $new_phone = htmlspecialchars(trim($_POST['phone']));
    $old_password = $_POST['old_password'];
    $new_password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];


    if (!password_verify($old_password, $userPassword)) {
        $message = '<i class="fas fa-times-circle"></i> <div class="error-message">Current password is incorrect.</div>';
    } else {
        if (!empty($new_password) && $new_password !== $confirm_password) {
            $message = '<div class="error-message">New passwords do not match.</div>';
        } else {
            $updated_password = !empty($new_password) ? password_hash($new_password, PASSWORD_DEFAULT) : $userPassword;

            $update_stmt = $conn->prepare("UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE name = ?");
            $update_stmt->bind_param("sssss", $new_name, $new_email, $new_phone, $updated_password, $user);

            if ($update_stmt->execute()) {
                $message = '<i class="fas fa-check-circle"></i> <div class="success-message">Profile updated successfully!</div>';
                $_SESSION['user'] = $new_name;
            } else {
                $message = '<i class="fas fa-times-circle"></i> <div class="error-message">An error occurred. Please try again later.</div>';
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
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="styles/profile.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="shortcut icon" href="images/favicon/image.png">
    <title>Profile Settings - Epicks</title>
</head>


<body>

    <!-- Header section -->
    <div class="header-section">

    </div>
    <!-- Header section -->

    <div class="container">
        <div class="header-profile">
            <h1>Profile Settings</h1>
            <p>Manage your account details</p>
        </div>

        <!-- Feedback Message -->
        <?php if (!empty($message)) : ?>
            <div class="message_container">
                <div class="message"><?php echo $message; ?></div>
            </div>
        <?php endif; ?>

        <form action="" method="post" id="profileForm" class="profile-form">
            <div class="form-grid">
                <div class="form-group">
                    <label for="username"><i class="fas fa-user"></i> Username</label>
                    <input type="text" id="username" name="username" value="<?php echo htmlspecialchars($userName); ?>" required>
                </div>

                <div class="form-group">
                    <label for="email"><i class="fas fa-envelope"></i> Email</label>
                    <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($userEmail); ?>" required>
                </div>

                <div class="form-group">
                    <label for="phone"><i class="fas fa-phone"></i> Phone Number</label>
                    <input type="tel" id="phone" name="phone" value="<?php echo htmlspecialchars($userPhone); ?>" required>
                </div>
            </div>

            <section class="password-section">
                <h3>Change Password</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="old_password"><i class="fas fa-lock"></i> Current Password</label>
                        <input type="password" id="old_password" name="old_password" required placeholder="Enter current password">
                    </div>
                    <div class="form-group">
                        <label for="password"><i class="fas fa-key"></i> New Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter new password">
                    </div>
                    <div class="form-group">
                        <label for="confirm_password"><i class="fas fa-check-circle"></i> Confirm New Password</label>
                        <input type="password" id="confirm_password" name="confirm_password" placeholder="Repeat new password">
                    </div>
                </div>
            </section>

            <button type="submit" name="save-changes" class="submit-btn">Save Changes</button>
        </form>

    </div>



    <!-- footer section -->
    <div class="footer-section">

    </div>

    <!-- footer section -->


    <script src="scripts/profileManagement.js" type="module"></script>
</body>

</html>