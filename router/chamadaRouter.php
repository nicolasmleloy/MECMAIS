<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../controller/chamadaController.php";

$acao = $_GET['acao'] ?? '';
$chamada = new ChamadaController();

switch ($acao) {
    case 'buscarNomeProfessor':
        $id = $_GET['id'] ?? '';
        echo json_encode($chamada->BuscarNomeProfessor($id));
        break;
    case 'buscarTurmas':
        echo json_encode($chamada->BuscarTurmas());
        break;
    case 'buscarAlunos':
        $turma = $_GET['turma'] ?? '';
        echo json_encode($chamada->BuscarAlunosPorTurma($turma));
        break;
    case 'enviarPresencas':
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);
        $ids = $data['ids'] ?? [];
        $turma = $data['turma'] ?? '';
        echo json_encode($chamada->EnviarPresencas($ids, $turma));
        break;
    case 'resetarChamada':
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);
        echo json_encode($chamada->ResetarChamada());
        break;
    default:
        echo json_encode(["erro" => "Ação inválida"]);
        break;
};