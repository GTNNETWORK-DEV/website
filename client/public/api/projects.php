<?php
// ------------------------------------
// BASIC HEADERS (IMPORTANT)
// ------------------------------------
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// ------------------------------------
// DB CONNECTION
// ------------------------------------
require "config.php";

// ------------------------------------
// METHOD
// ------------------------------------
$method = $_SERVER["REQUEST_METHOD"];

// ------------------------------------
// SAFE INPUT READER
// ------------------------------------
function getInput() {
    if (!empty($_POST)) return $_POST;

    $raw = file_get_contents("php://input");
    $json = json_decode($raw, true);

    return is_array($json) ? $json : [];
}

// ------------------------------------
// GET → FETCH PROJECTS
// ------------------------------------
if ($method === "GET") {
    $result = $conn->query("SELECT * FROM projects ORDER BY id DESC");

    if (!$result) {
        echo json_encode([]);
        exit;
    }

    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    exit;
}

// ------------------------------------
// POST → ADD PROJECT
// ------------------------------------
if ($method === "POST") {
    $input = getInput();

    $name = trim($input["name"] ?? "");
    $logo = trim($input["logo_url"] ?? "");
    $link = trim($input["link"] ?? "");

    if ($name === "") {
        echo json_encode(["success" => false, "error" => "Name required"]);
        exit;
    }

    $stmt = $conn->prepare(
        "INSERT INTO projects (name, logo_url, link) VALUES (?, ?, ?)"
    );
    $stmt->bind_param("sss", $name, $logo, $link);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
    exit;
}

// ------------------------------------
// DELETE → REMOVE PROJECT
// ------------------------------------
if ($method === "DELETE") {
    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);

    $id = $data["id"] ?? null;

    if (!$id) {
        echo json_encode(["success" => false]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM projects WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
    exit;
}

// ------------------------------------
echo json_encode(["error" => "Invalid request"]);
exit;
