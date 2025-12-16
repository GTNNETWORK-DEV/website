<?php
$env = parse_ini_file(__DIR__ . "/../.env");

try {
    $dsn = "pgsql:host={$env['DB_HOST']};port={$env['DB_PORT']};dbname={$env['DB_NAME']}";
    $pdo = new PDO($dsn, $env['DB_USER'], $env['DB_PASS'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "DB connection failed"
    ]);
    exit;
}
