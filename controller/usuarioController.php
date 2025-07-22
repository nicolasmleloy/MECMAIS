<?php
require_once __DIR__ . "/../config/db/database.php";

class UsuarioController{

    private $conn;

    public function __construct(){
        $banco = new Database();

        $this->conn = $banco->Connect();
    }

    public function GetAllUsuarios(){
        try {
            $sql = "SELECT * FROM usuarios";
            $db = $this->conn->prepare($sql);
            $db->execute();
            $usuario = $db->fetchAll(PDO::FETCH_ASSOC);

            if($usuario){
                return $usuario;
            }else{
                return false;
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function GetUsuarioById($id){
        try {
            $sql = "SELECT * FROM usuarios WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id",$id);
            $db->execute();
            $usuario = $db->fetch(PDO::FETCH_ASSOC);

            return $usuario;
        

        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function CreateUsuario($tipo_perfil ,$nome, $email, $senha, $turma){
        try {
            if($tipo_perfil == "aluno"){
                $sql = "INSERT INTO aluno(nome, senha, email, turma)VALUES(:nome,:senha, :email, :turma)";
                $db = $this->conn->prepare($sql);
                $db->bindParam(":nome",$nome);
                $db->bindParam(":senha",$senha);
                $db->bindParam(":email",$email);
                $db->bindParam(":turma",$turma);
            }else if($tipo_perfil == "professor"){
                $sql = "INSERT INTO professor(nome, senha, email)VALUES(:nome,:senha, :email)";
                $db = $this->conn->prepare($sql);
                $db->bindParam(":nome",$nome);
                $db->bindParam(":senha",$senha);
                $db->bindParam(":email",$email);
            }else if($tipo_perfil == "cozinha"){
                $sql = "INSERT INTO cozinha(nome, senha, email)VALUES(:nome,:senha, :email)";
                $db = $this->conn->prepare($sql);
                // $db->bindParam(":nome",$nome);
                $db->bindParam(":senha",$senha);
                $db->bindParam(":email",$email);
            }else{
                return false;
            }

            if($db->execute()){
                return true;
            }else{
                return false;
            }

        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function UpdateUsuario($nome,$senha,$id){
        try {
            $sql = "UPDATE usuarios SET nome = :nome, senha = :senha WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":nome",$nome);
            $db->bindParam(":senha",$senha);
            $db->bindParam(":id",$id);

            if($db->execute()){
                return true;
            }else{
                return false;
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function DeletarUsuario($id){
        try {
            $sql = "DELETE FROM usuarios WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id",$id);
            if($db->execute()){
                return true;
            }else{
                return false;
            }
        } catch (\Exception $th) {
            $th->getMessage();
        }
    }
}