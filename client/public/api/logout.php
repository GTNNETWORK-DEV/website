<?php
header("Content-Type: application/json");

// Safe session start
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Only allow POST for logout (SECURITY)
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "error" => "Invalid request method"
    ]);
    exit;
}

// Destroy all session data
$_SESSION = [];
session_unset();
session_destroy();

// Invalidate browser cookie
setcookie(session_name(), "", time() - 3600, "/");

echo json_encode([
    "success" => true,
    "message" => "Logged out"
]);
exit;
?>
