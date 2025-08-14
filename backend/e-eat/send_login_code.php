<?php
    include 'cors.php';
    include 'dbconfig.php';
    require 'vendor/autoload.php';  

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $email = $_POST['email'];
        $otp = rand(100000, 999999); // Generate a 6-digit OTP
        $tokenCreatedAt = date('Y-m-d H:i:s');

        // Check if the email exists
        $stmt = $connection->prepare("SELECT * FROM users WHERE user_name = ? AND role = 'non_student'");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            // If the email does not exist, insert it into the database
            $stmt = $connection->prepare("INSERT INTO users (user_name, token, token_created_at, role) VALUES (?, ?, ?, 'non_student')");
            $stmt->execute([$email, $otp, $tokenCreatedAt]);
        } else {
            // Update the user's token and token_created_at
            $stmt = $connection->prepare("UPDATE users SET token = ?, token_created_at = ? WHERE user_name = ?");
            $stmt->execute([$otp, $tokenCreatedAt, $email]);
        }

        // Send OTP via email
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';  
            $mail->SMTPAuth = true;
            $mail->Username = 'nhambitaonga@gmail.com'; 
            $mail->Password = 'cksc uijc shlj imxq'; // Replace with your App password (instructions on how to generate this shown below [1])
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // [1] 
            // How to Generate an App Password for Gmail

            // Sign In to Your Google Account:
            //     Go to Google Account.

            // Navigate to Security Settings:
            //     Click on the "Security" tab in the left sidebar.

            // Enable 2-Step Verification (if not already enabled):
            //     Click on "2-Step Verification" and follow the prompts to set it up.

            // Generate an App Password:
            //     Once 2-Step Verification is enabled, return to the "Security" page and scroll down to "App passwords".
            //     Click on "App passwords".
            //     You might need to re-enter your password to verify your identity.
            //     Select "Mail" as the app and "Other" as the device (you can name it anything, e.g., "PHPMailer").
            //     Click "Generate". Google will provide you with a 16-character password.

            // Use the App Password in PHPMailer:
            //     Replace 'your_password' with the 16-character App Password in your PHPMailer configuration.

            // [1]

            // Recipients
            $mail->setFrom('nhambitaonga@gmail.com', 'TCFL Canteen');
            $mail->addAddress($email);

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'TCFL | Your Login Code';
            $mail->Body    = "<p>Your login code is <strong>$otp</strong>. It will expire in 15 minutes.</p>";

            $mail->send();
            echo json_encode(['status' => 'success', 'message' => 'OTP sent to your email']);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to send OTP. Mailer Error: ' . $mail->ErrorInfo]);
        }
    }
?>
