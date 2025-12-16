<?php
require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../config/db.php";

echo json_encode([
    "success" => true,
    "status" => "Backend is alive 🚀",
    "db" => "connected"
]);
