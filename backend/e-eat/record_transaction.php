<?php
include 'cors.php';
include 'dbconfig.php';

$user_name = isset($_POST["user_name"]) ? $_POST["user_name"] : '';
$amount_in_cents = isset($_POST["amount_in_cents"]) ? $_POST["amount_in_cents"] : 0;
$transaction_verification_url = isset($_POST["transaction_verification_url"]) ? $_POST["transaction_verification_url"] : null;
$cart_items = isset($_POST["cart_items"]) ? json_decode($_POST["cart_items"], true) : [];

if (empty($user_name) || empty($amount_in_cents) || empty($cart_items)) {
    echo json_encode(["status" => "error", "message" => "Invalid input data."]);
    exit;
}

try {
    // Fetch user_id using user_name
    $sql = "SELECT user_id FROM `users` WHERE user_name = :user_name";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':user_name', $user_name);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $user_id = $user['user_id'];
 
        $insertOrderSQL = "INSERT INTO `orders` (user_id, total_amount_in_cents, transaction_verification_url) VALUES (:user_id, :amount_in_cents, :transaction_verification_url)";
        $insertOrderStmt = $connection->prepare($insertOrderSQL);
        $insertOrderStmt->bindParam(':user_id', $user_id);
        $insertOrderStmt->bindParam(':amount_in_cents', $amount_in_cents);
        $insertOrderStmt->bindParam(':transaction_verification_url', $transaction_verification_url);
        $insertOrderStmt->execute();

        $order_id = $connection->lastInsertId();
 
        foreach ($cart_items as $unique_id => $item) {
            $item_name = $item['item_name'];
            $item_count = $item['item_count'];
 
            $fetchItemSQL = "SELECT item_id FROM `menu_items` WHERE item_name = :item_name";
            $fetchItemStmt = $connection->prepare($fetchItemSQL);
            $fetchItemStmt->bindParam(':item_name', $item_name);
            $fetchItemStmt->execute();
            $menu_item = $fetchItemStmt->fetch(PDO::FETCH_ASSOC);

            if ($menu_item) {
                $item_id = $menu_item['item_id'];
 
                $insertDetailSQL = "INSERT INTO `order_details` (order_id, item_id, quantity) VALUES (:order_id, :item_id, :quantity)";
                $insertDetailStmt = $connection->prepare($insertDetailSQL);
                $insertDetailStmt->bindParam(':order_id', $order_id);
                $insertDetailStmt->bindParam(':item_id', $item_id);
                $insertDetailStmt->bindParam(':quantity', $item_count);
                $insertDetailStmt->execute();
            }
        }

        echo json_encode(["status" => "success", "message" => "Transaction recorded successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "User not found."]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
