<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" href="stylesheet.css">

        <div class="container">
            <h2>Sign In</h2>
            <form action="signin.php" method="POST">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <a href="index.html">Sign In</a>
                <a href="Signup.php">Sign Up</a>
            </form>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2024 Pop Vote. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>

<?php 

session_start();

include("connection.php");
include("functions.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Something was posted
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!empty($email) && !empty($password)) {
        // Read from database
        $query = "SELECT * FROM users WHERE user_name = ? LIMIT 1";
        $stmt = $con->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result) {
            if ($result->num_rows > 0) {
                $user_data = $result->fetch_assoc();
                if ($user_data['password'] === $password) {
                    $_SESSION['user_id'] = $user_data['user_id'];
                    header("Location: index.html");
                    die;
                }
            }
        }
        
        echo "Wrong email or passwrd!";
    } else {
        echo "Please enter both email and password!";
    }
}

?>