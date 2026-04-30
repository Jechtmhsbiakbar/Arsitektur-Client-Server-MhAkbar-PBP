<?php
header('Content-Type: application/json; charset=utf-8');

// koneksi untuk localhost xampp
$host = "localhost";
$user = "root";
$pass = "";
$db   = "db_toko";

// Koneksi untuk hosting infinityfree tugas ke 2
// $host = "sql104.infinityfree.com";
// $user = "if0_41724973";
// $pass = "WxMJqItMYH";
// $db   = "if0_41724973_db_toko";

// Koneksi untuk hosting infinityfree tugas ke 3
// $host = "sql101.infinityfree.com";
// $user = "if0_41799381";
// $pass = "2B9LgM34ErW";
// $db   = "if0_41799381_db_toko";

// Koneksi ke database
$koneksi = mysqli_connect($host, $user, $pass, $db);

if (!$koneksi) {
    die(json_encode([
        "status" => "error",
        "message" => "Koneksi database gagal: " . mysqli_connect_error()
    ]));
}
?>