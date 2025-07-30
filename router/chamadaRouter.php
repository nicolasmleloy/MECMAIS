<?php
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
    default:
        echo json_encode(["erro" => "Ação inválida"]);
        break;
};