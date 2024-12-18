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
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

    </head>

    <body>
        <div class="container">
            <div class="header-profile">
                <h1>Profile Settings</h1>
                <p>Manage your account details</p>
            </div>

            <form id="profileForm" class="profile-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="username">
                            <i class="fas fa-user"></i>Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            placeholder="Choose a unique username">
                    </div>

                    <div class="form-group">
                        <label for="email">
                            <i class="fas fa-envelope"></i>Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="Enter your email address">
                    </div>

                    <div class="form-group">
                        <label for="phone">
                            <i class="fas fa-phone"></i>Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            placeholder="Enter your phone number">
                    </div>
                </div>

                <div class="password-section">
                    <h3>Change Password</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="old_password">
                                <i class="fas fa-lock"></i>Current Password
                            </label>
                            <input
                                type="password"
                                id="old_password"
                                name="old_password"
                                required
                                placeholder="Enter current password">
                        </div>
                        <div class="form-group">
                            <label for="password">
                                <i class="fas fa-key"></i>New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter new password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="confirm_password">
                            <i class="fas fa-check-circle"></i>Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Repeat new password">
                    </div>
                </div>

                <button type="submit" class="submit-btn">
                    Save Changes
                </button>
            </form>
        </div>

        <script>
            document.getElementById('profileForm').addEventListener('submit', function(e) {
                e.preventDefault();

                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirm_password').value;

                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }

                // Here you would typically send data to server via AJAX
                alert('Profile update submitted!');
            });
        </script>
    </body>

    </html>



    <script src="scripts/profileManagement.js" type="module"></script>
</body>