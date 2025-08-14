<?php
    include 'cors.php';
    include 'dbconfig.php';

    function fetchPastTransactions() {
        global $connection;

        try { 
            $sql = "
                SELECT 
                    u.user_name, 
                    o.order_id, 
                    o.total_amount_in_cents, 
                    o.ordered_at, 
                    mi.item_name, 
                    od.quantity,
                    (od.quantity * mi.price_in_cents) AS amount_spent
                FROM orders o
                JOIN users u ON o.user_id = u.user_id
                JOIN order_details od ON o.order_id = od.order_id
                JOIN menu_items mi ON od.item_id = mi.item_id
                ORDER BY u.user_name, o.ordered_at DESC
            ";

            $stmt = $connection->prepare($sql);
            $stmt->execute();
            $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
            $groupedTransactions = [];
            foreach ($transactions as $transaction) {
                $user_name = $transaction['user_name'];
                if (!isset($groupedTransactions[$user_name])) {
                    $groupedTransactions[$user_name] = [
                        'total_amount_spent' => 0,
                        'orders' => []
                    ];
                }

                $order_id = $transaction['order_id'];
                if (!isset($groupedTransactions[$user_name]['orders'][$order_id])) {
                    $groupedTransactions[$user_name]['orders'][$order_id] = [
                        'total_amount_spent' => 0,
                        'items_purchased' => [],
                        'ordered_at' => $transaction['ordered_at']
                    ];
                }

                $groupedTransactions[$user_name]['orders'][$order_id]['items_purchased'][] = [
                    'item_name' => $transaction['item_name'],
                    'quantity' => $transaction['quantity'],
                    'amount_spent' => $transaction['amount_spent']
                ];

                $groupedTransactions[$user_name]['orders'][$order_id]['total_amount_spent'] += $transaction['amount_spent'];
                $groupedTransactions[$user_name]['total_amount_spent'] += $transaction['amount_spent'];
            }

            header('Content-Type: application/json');
            echo json_encode([
                'status' => 'success',
                'data' => $groupedTransactions
            ]);
        } catch (PDOException $e) {
            header('Content-Type: application/json');
            echo json_encode([
                'status' => 'error',
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
    }

    fetchPastTransactions();
?>
