<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Include the database connection
include_once 'db.php';

// Handle the PUT request to update an item
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id) && isset($data->name) && isset($data->description)) {
        $id = $data->id;
        $name = $data->name;
        $description = $data->description;

        $sql = "UPDATE items SET name='$name', description='$description' WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Item updated successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Missing id, name or description"]);
    }
}
?>
