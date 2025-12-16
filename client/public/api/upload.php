<?php

header("Content-Type: application/json");

// ===============================
// CONFIG
// ===============================

// Absolute server path (REAL folder)
$uploadDir = "/home/randtgss/dev.blockwavenation.com/uploads/";

// Public URL path (BROWSER)
$publicBase = "/uploads/";

// Create folder if not exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// ===============================
// GET FILE (ANY FIELD NAME)
// ===============================
$file = $_FILES[array_key_first($_FILES)] ?? null;

if (!$file) {
    echo json_encode([
        "success" => false,
        "error" => "No file received"
    ]);
    exit;
}

// ===============================
// BASIC UPLOAD CHECK
// ===============================
if ($file["error"] !== UPLOAD_ERR_OK) {
    echo json_encode([
        "success" => false,
        "error" => "Upload failed"
    ]);
    exit;
}

// ===============================
// EXTENSION CHECK
// ===============================
$allowedExt = ["jpg", "jpeg", "png", "webp", "gif"];
$ext = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

if (!in_array($ext, $allowedExt)) {
    echo json_encode([
        "success" => false,
        "error" => "Only image files allowed"
    ]);
    exit;
}

// ===============================
// MIME TYPE CHECK (NAMECHEAP SAFE)
// ===============================
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file["tmp_name"]);

$allowedMime = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];

if (!in_array($mime, $allowedMime)) {
    echo json_encode([
        "success" => false,
        "error" => "Invalid file content"
    ]);
    exit;
}

// ===============================
// SIZE LIMIT (2MB)
// ===============================
if ($file["size"] > 2 * 1024 * 1024) {
    echo json_encode([
        "success" => false,
        "error" => "Max size 2MB allowed"
    ]);
    exit;
}

// ===============================
// CLEAN & SAVE FILE
// ===============================
$cleanName = preg_replace("/[^a-zA-Z0-9_.-]/", "_", $file["name"]);
$finalName = time() . "_" . $cleanName;

$targetPath = $uploadDir . $finalName;

if (!move_uploaded_file($file["tmp_name"], $targetPath)) {
    echo json_encode([
        "success" => false,
        "error" => "Failed to save file"
    ]);
    exit;
}

// ===============================
// SUCCESS RESPONSE
// ===============================
echo json_encode([
    "success" => true,
    "url" => $publicBase . $finalName
]);
exit;
