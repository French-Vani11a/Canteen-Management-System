<?php
    include 'cors.php';
    include 'dbconfig.php';

    header('Content-Type: application/json');

    // Get POST data
    $registration_number = $_POST['registration_number'];
    $topup_amount = intval($_POST['topup_amount']) * 100; // Convert to cents

    try {
        // Update `users` table
        $sql_users = "UPDATE users SET student_balance = student_balance + :topup_amount WHERE user_name = :registration_number";
        $stmt_users = $connection->prepare($sql_users);
        $stmt_users->bindParam(':topup_amount', $topup_amount, PDO::PARAM_INT);
        $stmt_users->bindParam(':registration_number', $registration_number, PDO::PARAM_STR);
        $stmt_users->execute();

        // Update `student_db` table
        $sql_student_db = "UPDATE student_db SET student_overall_balance = student_overall_balance - :topup_amount WHERE student_registration_number = :registration_number";
        $stmt_student_db = $connection->prepare($sql_student_db);
        $stmt_student_db->bindParam(':topup_amount', $topup_amount, PDO::PARAM_INT);
        $stmt_student_db->bindParam(':registration_number', $registration_number, PDO::PARAM_STR);
        $stmt_student_db->execute();

        // Send success response
        $response = array('success' => true);
        echo json_encode($response);

    } catch (PDOException $e) {
        // Handle errors and send failure response
        $response = array('success' => false, 'error' => $e->getMessage());
        echo json_encode($response);
    }

    // Close the connection
    $connection = null;
?>
