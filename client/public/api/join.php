<?php
require "config.php";
header("Content-Type: application/json");

/**
 * Universal body reader (fixes React + FormData + JSON)
 */
function getInput() {
    if (!empty($_POST)) return $_POST;

    $raw = file_get_contents("php://input");
    $json = json_decode($raw, true);

    return is_array($json) ? $json : [];
}

$method = $_SERVER["REQUEST_METHOD"];

if ($method !== "POST") {
    echo json_encode([
        "success" => false,
        "error" => "Invalid request method"
    ]);
    exit;
}

$input = getInput();

// Inputs
$full_name = trim($input["full_name"] ?? "");
$email     = trim($input["email"] ?? "");
$phone     = trim($input["phone"] ?? "");
$country   = trim($input["country"] ?? "");
$company   = trim($input["company"] ?? "");

// Validation
if ($full_name === "" || $email === "" || $phone === "" || $country === "") {
    echo json_encode([
        "success" => false,
        "error" => "All required fields must be filled"
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "error" => "Invalid email format"
    ]);
    exit;
}

// Normalize null
$company = $company !== "" ? $company : null;

// DB insert
$stmt = $conn->prepare("
    INSERT INTO join_requests (full_name, email, phone, country, company)
    VALUES (?, ?, ?, ?, ?)
");

$stmt->bind_param("sssss", $full_name, $email, $phone, $country, $company);
$stmt->execute();
$stmt->close();

echo json_encode([
    "success" => true,
    "message" => "Request submitted successfully"
]);
exit;
?>
