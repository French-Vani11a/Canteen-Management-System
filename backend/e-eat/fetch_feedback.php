<?php 
    include 'cors.php';
    include 'dbconfig.php'; 
    $startDate = isset($_POST['startDate']) ? $_POST['startDate'] : '1970-01-01';
    $endDate = isset($_POST['endDate']) ? $_POST['endDate'] : date('Y-m-d');
 
    if (!DateTime::createFromFormat('Y-m-d', $startDate) || !DateTime::createFromFormat('Y-m-d', $endDate)) {
        echo json_encode(["error" => "Invalid date format. Use YYYY-MM-DD."]);
        exit;
    }

    try { 
        $sql = "SELECT feedback, created_at FROM feedback WHERE DATE(created_at) BETWEEN :startDate AND :endDate";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':startDate', $startDate);
        $stmt->bindParam(':endDate', $endDate);
        $stmt->execute();
 
        $feedback = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($feedback);
    } catch (PDOException $e) {
        
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
?>