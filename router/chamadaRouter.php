<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../controller/chamadaController.php";


$acao = $_GET['acao'] ?? '';
$chamada = new ChamadaController();

if($_SERVER["REQUEST_METHOD"] == "POST"){

    switch ($acao) {
        case 'enviarPresencas':
            $json = file_get_contents("php://input");
            $data = json_decode($json, true);
            $ids = $data['ids'] ?? [];
            $turma = $data['turma'] ?? '';
            echo json_encode($chamada->EnviarPresencas($ids, $turma));
            break;
        default:
            echo json_encode(["erro" => "Ação inválida"]);
            break;
    };
}else if($_SERVER["REQUEST_METHOD"] == "GET"){
    switch ($_GET["acao"]) {
        case 'QtdAlunosPresentes':
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);

            $resultado = $chamada->QtdAlunosPresentes();
            echo json_encode([$resultado]);
            break;
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
            echo "Nao encontrei nada";
            break;
    }
}else{
    echo "Erro";
}