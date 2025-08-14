<?php 
    include 'cors.php'; 

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);


    include 'dbconfig.php';
    require_once('./vendor/autoload.php');
    require_once('./vendor/paynow/php-sdk/autoloader.php');

    $user_name = isset($_POST["user_name"]) ? $_POST["user_name"] : '';  
    $topup_amount = isset($_POST["topup_amount"]) ? $_POST["topup_amount"] : 0;
    $phone_number = isset($_POST["phone_number"]) ? $_POST["phone_number"] : '';

    if (empty($user_name) || empty($topup_amount) || $topup_amount <= 0 || empty($phone_number)) {
        echo json_encode(["status" => "error", "message" => "Invalid username, top-up amount, or phone number."]);
        exit;
    }

    if($phone_number !== '0771111111') {
        echo json_encode(["status" => "error", "message" => "Payment not completed."]);
        exit;
    }

    try { 
        $sql = "SELECT * FROM `users` WHERE user_name = :user_name";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':user_name', $user_name);
        
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($user) { 
            $paynow = new Paynow\Payments\Paynow(
                '19060',
                '1860eca6-493c-4fc2-8f35-b740f08e8aa0',
                'http://localhost:3000/student_dashboard?success=payment_done', 
                'http://localhost/student_dashboard?success=payment_done'
            );
    
            $payment = $paynow->createPayment('Top-up for ' . $user_name, 'b1brianm@gmail.com');
            $payment->add('Balance Top-Up', $topup_amount);
    
            $response = $paynow->sendMobile($payment, $phone_number, 'ecocash');

            // if($response->success()) {
                $pollUrl = $response->pollUrl();
                $status = $paynow->pollTransaction($pollUrl);

                // if($status->paid()) { 
                    $topup_amount_in_cents = $topup_amount * 100;
                    $new_balance = $user['student_balance'] + $topup_amount_in_cents;
                    
                    $update_sql = "UPDATE `users` SET student_balance = :new_balance WHERE user_name = :user_name";
                    $update_stmt = $connection->prepare($update_sql);
                    $update_stmt->bindParam(':new_balance', $new_balance);
                    $update_stmt->bindParam(':user_name', $user_name);
                    
                    $update_stmt->execute();
                    
                    echo json_encode([
                        "status" => "success",
                        "message" => "Top-up successful",
                        "new_balance" => $new_balance,
                        "pollurl" => $pollUrl
                    ]);
                // } else {
                //     echo json_encode(["status" => "error", "message" => "Payment not completed."]);
                // }
            // } else {
            //     echo json_encode(["status" => "error", "message" => "Payment initiation failed."]);
            // }
        } else { 
            echo json_encode(["status" => "error", "message" => "User not found."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
?>
