<?php
header("Access-Control-Allow-Origin: *")
require_once __DIR__ . "/../controller/usuarioController.php";
$usuarioController = new UsuarioController();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    switch ($_GET["acao"]) {
        case 'create':

        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        $resultado = $usuarioController->CreateUsuario($data['perfil'], $data['nome'], $data['email'], $data['senha'], $data['turma']);
        echo json_encode([$resultado]);
        break;
         
        case "update":
            $resultado = $usuarioController->UpdateUsuario($_POST["nome"],$_POST["senha"], $_POST["usuario_id"]);
            if($resultado){
                header("Location: ../view/home/index.php");
            }else{
                header("Location: ../view/cadastro/index.php?id={$_POST['usuario_id']}");
            }
            break;
        case "deletarUsuario":
            $resultado = $usuarioController->DeletarUsuario($_POST["usuario_id"]);
            header("Location: ../view/home/index.php");
            break;
        
        default:
            echo "Nao encontrei nada";
            break;
    }
}