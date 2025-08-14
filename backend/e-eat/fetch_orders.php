<?php
include 'cors.php';
include 'dbconfig.php';

$user_name = isset($_POST["user_name"]) ? $_POST["user_name"] : '';

if (empty($user_name)) {
    echo json_encode(["status" => "error", "message" => "Invalid username."]);
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
        
        // Fetch orders and include order_id in the results
        $fetchOrdersSQL = "
            SELECT o.order_id, o.total_amount_in_cents, o.ordered_at, mi.item_name, od.quantity
            FROM `orders` o
            JOIN `order_details` od ON o.order_id = od.order_id
            JOIN `menu_items` mi ON od.item_id = mi.item_id
            WHERE o.user_id = :user_id
            ORDER BY o.ordered_at DESC";
        
        $fetchOrdersStmt = $connection->prepare($fetchOrdersSQL);
        $fetchOrdersStmt->bindParam(':user_id', $user_id);
        $fetchOrdersStmt->execute();
        
        $orders = $fetchOrdersStmt->fetchAll(PDO::FETCH_ASSOC);
        
        $total_amount_spent = 0;
        $items_purchased = [];
        
        foreach ($orders as $order) {
            $total_amount_spent += $order['total_amount_in_cents'];
            $items_purchased[] = [
                "order_number" => $order['order_id'],
                "item_name" => $order['item_name'],
                "quantity" => $order['quantity'],
                "ordered_at" => $order['ordered_at'],
                "amount_spent" => $order['total_amount_in_cents']
            ];
        }
        
        echo json_encode([
            "status" => "success",
            "total_amount_spent" => $total_amount_spent,
            "items_purchased" => $items_purchased
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "User not found."]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
