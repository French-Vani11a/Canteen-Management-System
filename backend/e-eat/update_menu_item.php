<?php
    include 'cors.php';
    include 'dbconfig.php';
 
    $data = json_decode(file_get_contents("php://input"));
 
    $item_name = $data->item_name;
    $new_item_name = $data->new_item_name;
    $description = $data->description;
    $price_in_cents = $data->price_in_cents * 100;
    $cook_time = $data->cook_time;  
    $availability = $data->availability;

    try {
        
        $stmt = $connection->prepare("UPDATE menu_items 
                                      SET item_name = :new_item_name, 
                                          description = :description, 
                                          price_in_cents = :price_in_cents, 
                                          cook_time = :cook_time,  
                                          availability = :availability 
                                      WHERE item_name = :item_name");
 
        $stmt->execute([
            ':new_item_name' => $new_item_name,
            ':description' => $description,
            ':price_in_cents' => $price_in_cents,
            ':cook_time' => $cook_time,   
            ':availability' => $availability,
            ':item_name' => $item_name
        ]);
 
        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => "success", "message" => "Menu item updated successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "No changes made or item not found."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Failed to update menu item: " . $e->getMessage()]);
    }
?>
