<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../controller/alunoController.php";

$acao = $_GET['acao'] ?? '';
$chamada = new AlunoController();

switch ($acao) {
    case 'buscarNomeAluno':
        $id = $_GET['id'] ?? '';
        echo json_encode($chamada->buscarNomeAluno($id));
        break;
    default:
        echo json_encode(["erro" => "Ação inválida"]);
        break;
};