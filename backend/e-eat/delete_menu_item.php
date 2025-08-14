<?php
    // include 'cors.php';
    // include 'dbconfig.php';

    // $data = json_decode(file_get_contents("php://input"));

    // $item_name = $data->item_name;

    // try {
    //     $stmt = $connection->prepare("DELETE FROM menu_items WHERE item_name = :item_name");
    //     $stmt->execute([':item_name' => $item_name]);

    //     if ($stmt->rowCount() > 0) {
    //         echo json_encode(["status" => "success", "message" => "Menu item deleted successfully."]);
    //     } else {
    //         echo json_encode(["status" => "error", "message" => "Item not found."]);
    //     }
    // } catch (PDOException $e) {
    //     echo json_encode(["status" => "error", "message" => "Failed to delete menu item: " . $e->getMessage()]);
    // }
 
    include 'cors.php';
    include 'dbconfig.php';

   
    $data = json_decode(file_get_contents("php://input"));

 
    $item_name = $data->item_name;
    $availability = 0;

    try {
 
        $stmt = $connection->prepare("UPDATE menu_items 
                                      SET availability = :availability 
                                      WHERE item_name = :item_name");

     
        $stmt->execute([
            ':availability' => $availability,
            ':item_name' => $item_name
        ]);
 
        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => "success", "message" => "Menu item deleted successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Item not found or no changes made."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Failed to update menu item: " . $e->getMessage()]);
    }
 

?>
