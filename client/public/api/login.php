<?php
session_start();
require "config.php";

header("Content-Type: application/json");

// Read JSON body safely
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// Avoid undefined index warning
$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

// Validate empty fields
if ($username === "" || $password === "") {
    echo json_encode(["success" => false, "message" => "Missing credentials"]);
    exit;
}

// Fetch user
$stmt = $conn->prepare("SELECT password FROM users WHERE username=? LIMIT 1");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($stored_pass);
$stmt->fetch();
$stmt->close();

// Check plain text login (your requirement)
if (!$stored_pass || $stored_pass !== $password) {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

// Log in user
$_SESSION["admin"] = true;
session_write_close(); // important on shared hosting

echo json_encode(["success" => true]);
exit;
?>
