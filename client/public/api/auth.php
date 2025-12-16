<?php
// Always send JSON header
header("Content-Type: application/json");

// Safe session start
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Ensure consistent session security
ini_set('session.cookie_httponly', 1);
ini_set('session.use_strict_mode', 1);

// Check admin login
if (empty($_SESSION["admin"]) || $_SESSION["admin"] !== true) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "error"   => "Unauthorized"
    ]);
    exit;
}
?>
