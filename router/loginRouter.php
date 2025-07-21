<?php
require_once __DIR__ . "/../controller/loginController.php";
$loginController = new LoginController();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    switch ($_GET["acao"]) {
        case 'validarLogin':
            $resultado = $loginController->ValidarLogin($_POST["nome"],$_POST["senha"]);
            if($resultado){
                header("Location: ../view/home/index.php");
            }else{
                header("Location: ../index.php");
            }
            break;
        
        default:
            echo "Nao encontrei nada";
            break;
    }
}