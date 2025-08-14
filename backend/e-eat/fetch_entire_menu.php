<?php 
    include 'cors.php';
    // require_once 'dbconfig.php';

    // try {
        
    //     $query = "SELECT * FROM menu_items WHERE availability = 1 ORDER BY id DESC";
    //     $statement = $connection->prepare($query);
    
    //     $statement->execute();
    
    //     $menuItems = $statement->fetchAll(PDO::FETCH_ASSOC);

        
    //     header('Content-Type: application/json');

    
    //     echo json_encode([
    //         'status' => 'success',
    //         'data' => $menuItems
    //     ]);
    // } catch (PDOException $e) {
        
    //     header('Content-Type: application/json');
    //     echo json_encode([
    //         'status' => 'error',
    //         'message' => $e->getMessage()
    //     ]);
    // }
 
    require_once 'dbconfig.php';

    try {
    
        $query = "SELECT * FROM menu_items ORDER BY item_id DESC";
        $statement = $connection->prepare($query);
    
        $statement->execute();

        $menuItems = $statement->fetchAll(PDO::FETCH_ASSOC);

        $structuredMenu = [];
        
        foreach ($menuItems as $item) {
            $structuredMenu[$item['item_name']] = [
                "description" => $item['description'],
                "price_in_cents" => $item['price_in_cents'],
                "availability" => $item['availability']
            ];
        }
 
        header('Content-Type: application/json'); 
        echo json_encode([
            'status' => 'success',
            'data' => $structuredMenu
        ]);
    } catch (PDOException $e) {
        
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    }
?>
 