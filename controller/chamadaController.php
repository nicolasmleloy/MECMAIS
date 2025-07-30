<?php
require_once __DIR__ . "/../config/config/db/database.php";

class ChamadaController {

    private $conn;

    public function __construct() {
        $banco = new Database();
        $this->conn = $banco->Connect();
    }

    public function BuscarTurmas() {
        try {
            $sql = "SELECT id, nome_turma FROM turma ORDER BY nome_turma";
            $db = $this->conn->prepare($sql);
            $db->execute();
            return $db->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }

    public function BuscarAlunosPorTurma($nomeTurma) {
        try {
            $sql = "SELECT id, nome FROM aluno WHERE nome_turma = :nome_turma";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":nome_turma", $nome_turma);
            $db->execute([$nomeTurma]);
            return $db->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }
}
