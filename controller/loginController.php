<?php
require_once __DIR__ . "/../config/db/database.php";

class LoginController{

    private $conn;

    public function __construct(){
        $banco = new Database();

        $this->conn = $banco->Connect();
    }

    public function ValidarLogin($nome,$senha){
        try {
            $sql = "SELECT * FROM usuarios WHERE email = :email AND senha = :senha";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":email",$email);
            $db->bindParam(":senha",$senha);
            $db->execute();
            $usuario = $db->fetchAll(PDO::FETCH_ASSOC);

            if($usuario){
                return true;
            }else{
                return false;
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}