<?php
require_once __DIR__ . "/../controller/notificacaoController.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
$notificacaoController = new NotificacaoController();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    switch ($_GET["acao"]) {
        default:
            echo "Nao encontrei nada";
            break;
    }

}else if($_SERVER["REQUEST_METHOD"] == "GET"){
    switch ($_GET["acao"]) {
        case 'obterNotificacoesCozinha':
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);

            $resultado = $notificacaoController->ObterNotificacoesCozinha();
            echo json_encode([$resultado]);
            break;

        case 'obterNotificacoesAluno':
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);

            $resultado = $notificacaoController->ObterNotificacoesAluno();
            echo json_encode([$resultado]);
            break;
        default:
            echo "Nao encontrei nada";
            break;
    }
}else{
    echo "Erro";
}