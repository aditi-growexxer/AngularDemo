<?php
$host = 'localhost';
$username = 'root';  // Default username for XAMPP or MAMP
$password = 'Root@123';      // Default password for XAMPP or MAMP
$database = 'crud_app';

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
