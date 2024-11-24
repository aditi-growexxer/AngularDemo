<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Include the database connection
include_once 'db.php';

// Handle the POST request to create a new item
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->name) && isset($data->description)) {
        $name = $data->name;
        $description = $data->description;

        $sql = "INSERT INTO items (name, description) VALUES ('$name', '$description')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "New item created successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Missing name or description"]);
    }
}
?>
