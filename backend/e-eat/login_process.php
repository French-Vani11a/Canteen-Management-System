<?php 
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
header("Access-Control-Max-Age: 10000");

include 'dbconfig.php';
 
$user_name = isset($_POST["user_name"]) ? $_POST["user_name"] : '';  
$password_field = isset($_POST["password_reg_number"]) ? $_POST["password_reg_number"] : '';
 
if (empty($user_name) || empty($password_field)) {
    echo json_encode(["status" => "error", "message" => "Username and password are required."]);
    exit;
}

try { 
    $sql = "SELECT * FROM `users` WHERE user_name = :user_name";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':user_name', $user_name);
     
    $stmt->execute();
     
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
 
    if ($user && $password_field === $user['password_field']) { 
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
        echo json_encode(["status" => "error", "message" => "Invalid login details."]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
