<?php
require "config.php";
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

/**
 * Universal input reader
 * Works for:
 * - FormData
 * - x-www-form-urlencoded
 * - Raw JSON
 */
function getInput() {
    if (!empty($_POST)) return $_POST;

    $raw = file_get_contents("php://input");
    $json = json_decode($raw, true);

    return is_array($json) ? $json : [];
}

/* ============================================================
   GET — Fetch all news
   ============================================================ */
if ($method === "GET") {

    $result = $conn->query("SELECT * FROM news ORDER BY id DESC");

    echo json_encode(
        $result->fetch_all(MYSQLI_ASSOC),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

/* ============================================================
   POST — Create news entry (NO AUTH)
   ============================================================ */
if ($method === "POST") {

    $input = getInput();

    $title       = trim($input["title"] ?? "");
    $description = trim($input["description"] ?? "");
    $image_url   = trim($input["image_url"] ?? "");

    if ($title === "" || $description === "") {
        echo json_encode([
            "success" => false,
            "error" => "Title and description are required"
        ]);
        exit;
    }

    $image_url = $image_url !== "" ? $image_url : null;

    $stmt = $conn->prepare("
        INSERT INTO news (title, description, image_url)
        VALUES (?, ?, ?)
    ");
    $stmt->bind_param("sss", $title, $description, $image_url);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
    exit;
}

/* ============================================================
   DELETE — Remove news entry (NO AUTH)
   ============================================================ */
if ($method === "DELETE") {

    $raw = file_get_contents("php://input");
    parse_str($raw, $data);

    $id = $data["id"] ?? null;

    if (!$id || !is_numeric($id)) {
        echo json_encode([
            "success" => false,
            "error" => "Invalid ID"
        ]);
        exit;
    }

    $id = (int)$id;

    $stmt = $conn->prepare("DELETE FROM news WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
    exit;
}

/* ============================================================
   FALLBACK
   ============================================================ */
echo json_encode(["error" => "Invalid request"]);
exit;
