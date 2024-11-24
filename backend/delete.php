<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root";
$password = "Root@123";
$dbname = "crud_app"; // Update this with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the 'id' parameter from the URL
$id = isset($_GET['id']) ? $_GET['id'] : die("ID not provided");

// Prepare SQL DELETE statement
$sql = "DELETE FROM items WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

// Execute the query
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Item deleted"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error deleting item"]);
}

$stmt->close();
$conn->close();
?>
