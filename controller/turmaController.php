<?php
require_once __DIR__ . "/../config/config/db/database.php";

class TurmaController{

    private $conn;

    public function __construct(){
        $banco = new Database();

        $this->conn = $banco->Connect();
    }

    // public function GetAllUsuarios(){
    //     try {
    //         $sql = "SELECT * FROM professor";
    //         $db = $this->conn->prepare($sql);
    //         $db->execute();
    //         $usuario = $db->fetchAll(PDO::FETCH_ASSOC);

    //         if($usuario){
    //             return $usuario;
    //         }else{
    //             return false;
    //         }
    //     } catch (\Throwable $th) {
    //         return $th->getMessage();
    //     }
    // }

    // public function GetUsuarioById($id){
    //     try {
    //         $sql = "SELECT * FROM usuarios WHERE id = :id";
    //         $db = $this->conn->prepare($sql);
    //         $db->bindParam(":id",$id);
    //         $db->execute();
    //         $usuario = $db->fetch(PDO::FETCH_ASSOC);

    //         return $usuario;

    //     } catch (\Throwable $th) {
    //         return $th->getMessage();
    //     }
    // }

    public function CreateTurma($nome_turma){
        try {
            $sqlTurma = "SELECT COUNT(nome_turma) AS total FROM turma WHERE nome_turma = :nome_turma";
            $stmtTurma = $this->conn->prepare($sqlTurma);
            $stmtTurma->bindParam(":nome_turma", $nome_turma);
            $stmtTurma->execute();
            $resultTurma = $stmtTurma->fetch(PDO::FETCH_ASSOC);
        
            if ($resultTurma['total'] == 0) {
                $sql = "INSERT INTO TURMA(nome_turma) VALUES (:nome_turma)";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(":nome_turma", $nome_turma);
            }else{
                return false;
            }
            
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
    // public function UpdateUsuario($nome,$senha,$id){
    //     try {
    //         $sql = "UPDATE usuarios SET nome = :nome, senha = :senha WHERE id = :id";
    //         $db = $this->conn->prepare($sql);
    //         $db->bindParam(":nome",$nome);
    //         $db->bindParam(":senha",$senha);
    //         $db->bindParam(":id",$id);

    //         if($db->execute()){
    //             return true;
    //         }else{
    //             return false;
    //         }
    //     } catch (\Throwable $th) {
    //         return $th->getMessage();
    //     }
    // }

    // public function DeletarUsuario($id){
    //     try {
    //         $sql = "DELETE FROM usuarios WHERE id = :id";
    //         $db = $this->conn->prepare($sql);
    //         $db->bindParam(":id",$id);
    //         if($db->execute()){
    //             return true;
    //         }else{
    //             return false;
    //         }
    //     } catch (\Exception $th) {
    //         return $th->getMessage();
    //     }
    // }
}