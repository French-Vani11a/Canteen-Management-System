<?php
include 'cors.php';
include 'dbconfig.php';

header('Content-Type: application/json');

// Get the start and end dates from the request
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];

// Validate and sanitize input
$start_date = filter_var($start_date, FILTER_SANITIZE_STRING);
$end_date = filter_var($end_date, FILTER_SANITIZE_STRING);

if (empty($start_date) || empty($end_date)) {
    echo json_encode(['error' => 'Start and end dates are required']);
    exit;
}

try {
    $sql = "SELECT mi.item_name, DATE(o.ordered_at) AS date, SUM(od.quantity * mi.price_in_cents) AS total_revenue
            FROM order_details od
            JOIN menu_items mi ON od.item_id = mi.item_id
            JOIN orders o ON od.order_id = o.order_id
            WHERE o.ordered_at BETWEEN :start_date AND :end_date
            GROUP BY mi.item_name, DATE(o.ordered_at)
            ORDER BY mi.item_name, DATE(o.ordered_at)";

    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':start_date', $start_date);
    $stmt->bindParam(':end_date', $end_date);
    $stmt->execute();

    $revenues = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Transform data into a structured format
    $data = [];
    foreach ($revenues as $row) {
        $item_name = $row['item_name'];
        $date = $row['date'];
        $total_revenue = $row['total_revenue'];
        
        if (!isset($data[$item_name])) {
            $data[$item_name] = ['dates' => [], 'revenues' => []];
        }
        
        $data[$item_name]['dates'][] = $date;
        $data[$item_name]['revenues'][] = $total_revenue;
    }

    echo json_encode($data);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

$connection = null;
?>
