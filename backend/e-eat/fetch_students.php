<?php
    include 'cors.php';
    include 'dbconfig.php';
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    header('Content-Type: application/json');

    try {
        $sql = "SELECT sd.first_name, sd.last_name, sd.student_registration_number, sd.student_account_number, sd.student_overall_balance, u.student_balance 
                FROM student_db sd
                JOIN users u ON sd.student_registration_number = u.user_name 
                WHERE u.is_student = 1";
 
        $stmt = $connection->prepare($sql);
        $stmt->execute();
         
        $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
        echo json_encode($students);
    } catch (PDOException $e) {
        echo json_encode(array("error" => $e->getMessage()));
    } finally {
 
        $connection = null;
    }
?>
