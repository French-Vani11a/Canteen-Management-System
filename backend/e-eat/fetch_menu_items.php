<?php
    include 'cors.php';
    include 'dbconfig.php';

    header('Content-Type: application/json');

    try {
        // Create a new PDO instance
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare and execute the SQL statement
        $sql = "SELECT item_id, item_name FROM menu_items";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        // Fetch all results as an associative array
        $menu_items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Output the results as JSON
        echo json_encode($menu_items);
    } catch (PDOException $e) {
        // Handle any errors
        echo json_encode(array('error' => $e->getMessage()));
    }
?>
