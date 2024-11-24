<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root";
$password = "Root@123";
$dbname = "crud_app";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (isset($data['name']) && isset($data['description'])) {
    $name = $data['name'];
    $description = $data['description'];

    // Insert data into the database
    $sql = "INSERT INTO items (name, description) VALUES ('$name', '$description')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Item added successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Both name and description are required."]);
}

$conn->close();
?>
