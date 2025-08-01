<?php
require_once __DIR__ . "/../controller/cardapioController.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$cardapioController = new CardapioController();

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    switch ($_GET["acao"]) {
        case 'buscarIngredientes':
            echo json_encode($cardapioController->buscarIngredientes());
            break;

        case 'buscarCardapioSemana':
            echo json_encode($cardapioController->buscarCardapioSemana());
            break;

        default:
            echo json_encode(["erro" => "Ação não encontrada"]);
            break;
    }
} else if($_SERVER["REQUEST_METHOD"] === "POST"){
    switch ($_GET["acao"]) {
        case 'salvarCardapio':
            $input = json_decode(file_get_contents("php://input"), true);
            echo json_encode($cardapioController->salvarCardapio($input));
            break;

        case 'capturarIngredientes':
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);
            echo json_encode($cardapioController->buscarIngredientesDia($data['diaDaSemana']));
            break;

        default:
            echo json_encode(["erro" => "Ação não encontrada"]);
            break;
    }
}else{
    echo json_encode(["erro" => "Método inválido"]);
}
