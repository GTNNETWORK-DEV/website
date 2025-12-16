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
   GET — Fetch blogs
   ========================= */
if ($method === "GET") {

    $result = $conn->query("SELECT * FROM blogs ORDER BY id DESC");

    echo json_encode(
        $result->fetch_all(MYSQLI_ASSOC),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

/* =========================
   POST — Create blog
   ========================= */
if ($method === "POST") {

    $input = getInput();

    $title     = trim($input["title"] ?? "");
    $excerpt   = trim($input["excerpt"] ?? "");
    $author    = trim($input["author"] ?? "");
    $image_url = trim($input["image_url"] ?? "");

    if ($title === "" || $excerpt === "" || $author === "") {
        echo json_encode([
            "success" => false,
            "error" => "Missing required fields"
        ]);
        exit;
    }

    $image_url = $image_url !== "" ? $image_url : null;

    $stmt = $conn->prepare(
        "INSERT INTO blogs (title, excerpt, author, image_url)
         VALUES (?, ?, ?, ?)"
    );
    $stmt->bind_param("ssss", $title, $excerpt, $author, $image_url);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
    exit;
}

/* =========================
   DELETE — Remove blog
   ========================= */
if ($method === "DELETE") {

    parse_str(file_get_contents("php://input"), $data);
    $id = $data["id"] ?? null;

    if (!$id || !is_numeric($id)) {
        echo json_encode([
            "success" => false,
            "error" => "Invalid delete request"
        ]);
        exit;
    }

    $id = (int)$id;

    $stmt = $conn->prepare("DELETE FROM blogs WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
    exit;
}

echo json_encode(["error" => "Invalid request"]);
exit;
