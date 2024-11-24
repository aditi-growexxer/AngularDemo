<?php
// Include the database connection file
include_once 'db.php';

// Create a query to get all records
$query = "SELECT * FROM items";
$result = mysqli_query($conn, $query);

// Check if records are found
if (mysqli_num_rows($result) > 0) {
    $items = [];

    // Fetch all records
    while ($row = mysqli_fetch_assoc($result)) {
        $items[] = $row;
    }

    // Return the records as a JSON response
    echo json_encode($items);
} else {
    echo json_encode([]);
}

mysqli_close($conn);
