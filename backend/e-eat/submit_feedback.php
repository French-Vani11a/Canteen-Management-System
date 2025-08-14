<?php
    include 'cors.php';
    include 'dbconfig.php';

    $feedback = $_POST['feedback'];

    try {
        $sql = "INSERT INTO feedback (feedback) VALUES (:feedback)";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':feedback', $feedback);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Feedback submitted successfully!"]);
        } else {
            echo json_encode(["error" => "Error submitting feedback"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
?>
