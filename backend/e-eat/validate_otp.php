    <?php
    include 'cors.php';
    include 'dbconfig.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $email = $_POST['email'];
        $otp = $_POST['login_code'];
        $currentDatetime = new DateTime();
    
        $stmt = $connection->prepare("SELECT * FROM users WHERE user_name = ? AND role = 'non_student'");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $tokenCreatedAt = new DateTime($user['token_created_at']);
            $interval = $currentDatetime->diff($tokenCreatedAt);
    
            if ($user['token'] === $otp && $interval->i < 15) {
                echo json_encode(['status' => 'success', 'message' => 'Login successful', 'user' => $user]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Invalid or expired OTP']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Email not found or not a non-student user']);
        }
    }
?>
