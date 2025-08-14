<?php
    include 'cors.php';
    include 'dbconfig.php';  

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $user_name = $_POST['user_name']; 
     
        $user_query = "SELECT user_id FROM users WHERE user_name = :user_name";
        $user_stmt = $connection->prepare($user_query);
        $user_stmt->execute([':user_name' => $user_name]);

        if ($user_stmt->rowCount() > 0) {
            $user_row = $user_stmt->fetch(PDO::FETCH_ASSOC);
            $user_id = $user_row['user_id'];
 
            $order_query = "SELECT order_id FROM orders WHERE user_id = :user_id ORDER BY order_id DESC LIMIT 1";
            $order_stmt = $connection->prepare($order_query);
            $order_stmt->execute([':user_id' => $user_id]);

            if ($order_stmt->rowCount() > 0) {
                $order_row = $order_stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode([
                    "status" => "success",
                    "order_number" => $order_row['order_id']
                ]);
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "No orders found for this user."
                ]);
            }
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "User not found."
            ]);
        }

    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid request method."
        ]);
    }
?>
