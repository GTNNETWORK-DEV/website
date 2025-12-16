<?php
require "config.php";
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

/**
 * Universal input reader
 */
function getInput() {
    if (!empty($_POST)) return $_POST;
    $raw = file_get_contents("php://input");
    $json = json_decode($raw, true);
    return is_array($json) ? $json : [];
}

/* =========================
   GET — Fetch all events
   ========================= */
if ($method === "GET") {

    $result = $conn->query("SELECT * FROM events ORDER BY id DESC");

    echo json_encode(
        $result->fetch_all(MYSQLI_ASSOC),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

/* =========================
   POST — Create event
   ========================= */
if ($method === "POST") {

    $input = getInput();

    $name       = trim($input["name"] ?? "");
    $event_date = trim($input["event_date"] ?? "");
    $location   = trim($input["location"] ?? "");
    $link       = trim($input["link"] ?? "");
    $image_url  = trim($input["image_url"] ?? "");

    if ($name === "") {
        echo json_encode(["success" => false, "error" => "Event name required"]);
        exit;
    }

    $event_date = $event_date ?: null;
    $location   = $location   ?: null;
    $link       = $link       ?: null;
    $image_url  = $image_url  ?: null;

    $stmt = $conn->prepare(
        "INSERT INTO events (name, event_date, location, link, image_url)
         VALUES (?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("sssss", $name, $event_date, $location, $link, $image_url);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
    exit;
}

/* =========================
   DELETE — Remove event
   ========================= */
if ($method === "DELETE") {

    parse_str(file_get_contents("php://input"), $data);
    $id = $data["id"] ?? null;

    if (!$id || !is_numeric($id)) {
        echo json_encode(["success" => false, "error" => "Invalid ID"]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
    exit;
}

echo json_encode(["error" => "Invalid request"]);
exit;
