<?php 

    include 'cors.php';

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);
    

    require_once("./vendor/autoload.php");

    require_once('./vendor/paynow/php-sdk/autoloader.php');
    

    $total_items = $_POST["total_items"];
    $total_amount = $_POST["total_amount"] / 100;
    $phone_number = $_POST["phone_number"];

    $paynow = new Paynow\Payments\Paynow(
        '19060',
        '1860eca6-493c-4fc2-8f35-b740f08e8aa0',
        'http://localhost:3000/student_dashboard?success=payment_done', 
        'http://localhost/student_dashboard?success=payment_done'
    );
 

    $payment = $paynow->createPayment('Items purchased: ' . $total_items, 'b1brianm@gmail.com');

    $payment->add('Food', $total_amount);
 
    $response = $paynow->sendMobile($payment, $phone_number, 'ecocash'); 

    $pollUrl = $response->pollUrl();
    $status = $paynow->pollTransaction($pollUrl);

    $reflection = new ReflectionClass($response);
    $dataProperty = $reflection->getProperty('data');
    $dataProperty->setAccessible(true);
    $data = $dataProperty->getValue($response);

    $pollurl = isset($data['pollurl']) ? $data['pollurl'] : null;
    $status = $paynow->pollTransaction($pollUrl);

    $response_json = json_encode($data, JSON_PRETTY_PRINT);

    header('Content-Type: application/json');

    if($response->success()) { 
        echo json_encode($data, JSON_PRETTY_PRINT);
    } else { 
        echo json_encode(["status" => "failure"], JSON_PRETTY_PRINT);
    }


?>