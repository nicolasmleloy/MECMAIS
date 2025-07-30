<?php
require_once __DIR__ . "/../config/config/db/database.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'] ?? '';
$email = $input['email'] ?? '';
$senha = $input['senha'] ?? '';
$tipo  = strtolower($input['tipo'] ?? '');

if (!$email || !$senha || !$tipo) {
    echo json_encode(["success" => false, "message" => "Dados incompletos."]);
    exit;
}

require_once __DIR__ . "/../controller/loginController.php";
$loginController = new LoginController();
$usuarios = $loginController->BuscarLogin();

foreach ($usuarios as $usuario) {
    if (
        $usuario['email'] === $email &&
        $usuario['senha'] === $senha &&
        strtolower($usuario['tipo']) === $tipo
    ) {
        echo json_encode(["success" => true, "user" => $usuario]);
        exit;
    }
}

echo json_encode(["success" => false, "message" => "Usuário ou senha inválidos."]);
