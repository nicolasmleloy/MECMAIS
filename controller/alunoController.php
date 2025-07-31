<?php
require_once __DIR__ . "/../config/config/db/database.php";

class AlunoController {

    private $conn;

    public function __construct() {
        $banco = new Database();
        $this->conn = $banco->Connect();
    }

    public function BuscarNomeAluno($idAluno) {
        try {
            $sql = "SELECT nome FROM aluno WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $idAluno);
            $db->execute();
            return $db->fetch(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }
    
    public function BuscarChamada($idAluno) {
        try {
            $sql = "SELECT presenca FROM chamada WHERE id_aluno = :id ORDER BY id DESC LIMIT 1";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $idAluno);
            $db->execute();
            return $db->fetch(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }
    
}
