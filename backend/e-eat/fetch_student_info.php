<?php 
    include 'cors.php';
    include 'dbconfig.php';

    $user_name = isset($_POST["user_name"]) ? $_POST["user_name"] : '';

    if (empty($user_name)) {
        echo json_encode(["status" => "error", "message" => "Username is required."]);
        exit;
    }

    try { 
        $sql = "SELECT * FROM `users` WHERE user_name = :user_name";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':user_name', $user_name);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) { 
            echo json_encode([
                "status" => "success",
                "user" => [
                    "user_name" => $user['user_name'],
                    "first_name" => $user['first_name'],
                    "last_name" => $user['last_name'],
                    "role" => $user['role'],
                    "student_balance" => $user['student_balance']
                ]
            ]);
        } else { 
            echo json_encode(["status" => "error", "message" => "User not found."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
?>
