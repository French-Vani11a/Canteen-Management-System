<?php 
$host = 'localhost';  
$dbname = 'e_eat';
$username = 'root';
$password = ''; 

try {
    $connection = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password); 
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
