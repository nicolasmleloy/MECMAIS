<?php
require_once __DIR__ . "/../config/config/db/database.php";

class UsuarioController{

    private $conn;

    public function __construct(){
        $banco = new Database();

        $this->conn = $banco->Connect();
    }

    public function GetAllUsuarios(){
        try {
            $sql = "SELECT * FROM professor";
            $db = $this->conn->prepare($sql);
            $db->execute();
            $usuario = $db->fetchAll(PDO::FETCH_ASSOC);

            if($usuario){
                return $usuario;
            }else{
                return false;
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
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
            return $th->getMessage();
        }
    }

    public function CreateUsuario($tipo_perfil ,$nome, $email, $senha, $turma){
        try {
            if (!in_array($tipo_perfil, ["Aluno(a)", "Professor(a)", "Cozinheiro(a)"])) {
                throw new Exception("Tipo de perfil inválido: " . $tipo_perfil);
            }else{
                if($tipo_perfil == "Aluno(a)"){
                    $sqlTurma = "SELECT id FROM turma WHERE nome_turma = :nome_turma";
                    $stmtTurma = $this->conn->prepare($sqlTurma);
                    $stmtTurma->bindParam(":nome_turma", $turma);
                    $stmtTurma->execute();
                    $resultTurma = $stmtTurma->fetch(PDO::FETCH_ASSOC);
                
                    if (!$resultTurma) {
                        throw new Exception("Turma não encontrada: " . $turma);
                    }
                    $id_turma = $resultTurma['id'];
                
                    $sql = "INSERT INTO aluno(nome, email, senha, id_turma) VALUES (:nome, :email, :senha, :id_turma)";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(":nome", $nome);
                    $stmt->bindParam(":email", $email);
                    $stmt->bindParam(":senha", $senha);
                    $stmt->bindParam(":id_turma", $id_turma);
                
                    if ($stmt->execute()) {
                        return true;
                    } else {
                        return false;
                    }                
                }else if($tipo_perfil == "Professor(a)"){
                    $sql = "INSERT INTO professor(nome, email, senha)VALUES(:nome, :email, :senha)";
                    $db = $this->conn->prepare($sql);
                    $db->bindParam(":nome",$nome);
                    $db->bindParam(":email",$email);
                    $db->bindParam(":senha",$senha);
                }else if($tipo_perfil == "Cozinheiro(a)"){
                    $sql = "INSERT INTO cozinha(email, senha)VALUES(:email, :senha)";
                    $db = $this->conn->prepare($sql);
                    $db->bindParam(":email",$email);
                    $db->bindParam(":senha",$senha);
                }
    
                if($db->execute()){
                    return true;
                }else{
                    return false;
                }
            }
            

        } catch (\Throwable $th) {
            return $th->getMessage();
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
            return $th->getMessage();
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
            return $th->getMessage();
        }
    }
}