<?php 
    include 'cors.php';

    include 'dbconfig.php';

    $user_name = $_POST["user_name"];  
    $new_student_balance = $_POST["new_student_balance"];  
 

    if (empty($user_name) || empty($new_student_balance)) {
        echo json_encode(["status" => "error", "message" => "Username and new balance amount are required."]);
        exit;
    }

    try { 
        $sql = "UPDATE `users` SET student_balance = :new_student_balance WHERE user_name = :user_name";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':new_student_balance', $new_student_balance);
        $stmt->bindParam(':user_name', $user_name);
         
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                "status" => "success",
                "message" => "Student balance updated successfully."
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "No user found or balance not updated."
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
?>
