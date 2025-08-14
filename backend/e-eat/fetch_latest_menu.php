<?php
    include 'cors.php';
    require_once 'dbconfig.php';

    try {
        // Fetch menu items
        $queryMenuItems = "SELECT * FROM menu_items WHERE availability = 1 ORDER BY item_id DESC";
        $statementMenuItems = $connection->prepare($queryMenuItems);
        $statementMenuItems->execute();
        $menuItems = $statementMenuItems->fetchAll(PDO::FETCH_ASSOC);

        $structuredMenu = [];
        
        foreach ($menuItems as $item) {
            $structuredMenu[$item['item_name']] = [
                "description" => $item['description'],
                "price_in_cents" => $item['price_in_cents'],
                "availability" => $item['availability'],
                "cook_time" => $item['cook_time']
            ];
        }

        // Fetch count of current orders
        $queryCurrentOrdersCount = "SELECT COUNT(*) AS current_orders_count FROM orders WHERE is_order_done = 0";
        $statementCurrentOrdersCount = $connection->prepare($queryCurrentOrdersCount);
        $statementCurrentOrdersCount->execute();
        $result = $statementCurrentOrdersCount->fetch(PDO::FETCH_ASSOC);
        $currentOrdersCount = $result['current_orders_count'];

        // Send response
        header('Content-Type: application/json'); 
        echo json_encode([
            'status' => 'success',
            'data' => $structuredMenu,
            'current_orders_count' => $currentOrdersCount
        ]);
    } catch (PDOException $e) {
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    }
?>
