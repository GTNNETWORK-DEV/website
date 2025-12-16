<?php

// --- DATABASE CONFIG ---
$DB_HOST = "localhost";
$DB_USER = "gtnnasml_randtgss_GTN_MAIN";
$DB_PASS = "RRKZHzBdyYbi";
$DB_NAME = "gtnnasml_randtgss_GTN_MAIN";

// --- DATABASE CONNECTION ---
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
if ($conn->connect_errno) {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed",
        "details" => $conn->connect_errno
    ]);
    exit;
}

// UTF8 REQUIRED FOR NAMECHEAP
$conn->set_charset("utf8mb4");

// Fix strict mode issues
$conn->query("SET SESSION sql_mode=''");

// Fix session path issue (Namecheap shared hosting)
session_save_path($_SERVER['DOCUMENT_ROOT'] . "/tmp_sessions");
if (!file_exists($_SERVER['DOCUMENT_ROOT'] . "/tmp_sessions")) {
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/tmp_sessions", 0755, true);
}

// JSON helper
function send_json($data, $status_code = 200) {
    http_response_code($status_code);
    header("Content-Type: application/json");
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
?>
