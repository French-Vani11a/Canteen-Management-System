<?php
    include 'cors.php';
    require_once 'dbconfig.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $itemName = $_POST['item_name'] ?? '';
        $description = $_POST['description'] ?? '';
        $priceInCents = $_POST['price_in_cents'] * 100 ?? 0;
        $cookTime = $_POST['cook_time'] ?? '';   
        $availability = isset($_POST['availability']) ? (int)$_POST['availability'] : 0;

        try {
             
            $checkQuery = "SELECT COUNT(*) FROM menu_items WHERE item_name = :name";
            $checkStmt = $connection->prepare($checkQuery);
            $checkStmt->bindParam(':name', $itemName, PDO::PARAM_STR);
            $checkStmt->execute();
            $itemExists = $checkStmt->fetchColumn();

            if ($itemExists > 0) {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Item already exists in the menu.'
                ]);
                exit;
            }
 
            $insertQuery = "INSERT INTO menu_items (item_name, description, price_in_cents, cook_time, availability) 
                            VALUES (:name, :description, :price_in_cents, :cook_time, :availability)";
            $insertStmt = $connection->prepare($insertQuery);
            $insertStmt->bindParam(':name', $itemName, PDO::PARAM_STR);
            $insertStmt->bindParam(':description', $description, PDO::PARAM_STR);
            $insertStmt->bindParam(':price_in_cents', $priceInCents, PDO::PARAM_INT);
            $insertStmt->bindParam(':cook_time', $cookTime, PDO::PARAM_STR);   
            $insertStmt->bindParam(':availability', $availability, PDO::PARAM_INT);

            if ($insertStmt->execute()) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Menu item added successfully.'
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Failed to add menu item.'
                ]);
            }
        } catch (PDOException $e) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid request method.'
        ]);
    }
?>
