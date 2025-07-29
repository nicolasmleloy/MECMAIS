<?php
require_once __DIR__ . "/../controller/usuarioController.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
$usuarioController = new UsuarioController();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    switch ($_GET["acao"]) {
        case 'create':
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);

            $resultado = $usuarioController->CreateUsuario($data['tipo_perfil'], $data['nome'], $data['email'], $data['senha'], $data['turma']);
            echo json_encode([$resultado]);
            break;
        case 'update':
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);

            $resultado = $usuarioController->UpdateUsuario($data['tipo_perfil'], $data['nome'], $data['email_antigo'], $data['email_novo'], $data['senha'], $data['turma']);
            echo json_encode([$resultado]);
            break;
        case 'delete':
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);
        
            $resultado = $turmaController->DeleteTurma($data['turma_a_remover']);
            echo json_encode([$resultado]);
            break;
        default:
            echo "Nao encontrei nada";
            break;
    }

}else if($_SERVER["REQUEST_METHOD"] == "GET"){
    switch ($_GET["acao"]) {
        case 'buscarUsuarios':
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);

            $resultado = $usuarioController->BuscarTodosUsuarios();
            echo json_encode([$resultado]);
            break;
        
        default:
            echo "Nao encontrei nada";
            break;
    }
}else{
    echo "Erro";
}