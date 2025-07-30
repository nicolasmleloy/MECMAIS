<?php
require_once __DIR__ . "/../config/config/db/database.php";

class ChamadaController {

    private $conn;

    public function __construct() {
        $banco = new Database();
        $this->conn = $banco->Connect();
    }

    public function BuscarNomeProfessor($idProfessor) {
        try {
            $sql = "SELECT nome FROM professor WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $idProfessor);
            $db->execute();
            return $db->fetch(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
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
            $sqlTurma = "SELECT id FROM turma WHERE nome_turma = :nome_turma";
            $stmtTurma = $this->conn->prepare($sqlTurma);
            $stmtTurma->bindParam(":nome_turma", $nomeTurma);
            $stmtTurma->execute();
            $turma = $stmtTurma->fetch(PDO::FETCH_ASSOC);
            
            if (!$turma) {
                return ["erro" => "Turma não encontrada"];
            }
            
            $idTurma = $turma['id'];
            
            $sql = "SELECT id, nome FROM aluno WHERE id_turma = :id_turma";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id_turma", $idTurma);
            $db->execute();
            
            return $db->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }

    public function EnviarPresencas($ids, $nomeTurma) {
        try {
            if (empty($ids) || empty($nomeTurma)) {
                return ["erro" => "Dados incompletos"];
            }
    
            $sqlTurma = "SELECT id FROM turma WHERE nome_turma = :nome";
            $stmtTurma = $this->conn->prepare($sqlTurma);
            $stmtTurma->bindParam(":nome", $nomeTurma);
            $stmtTurma->execute();
            $turma = $stmtTurma->fetch(PDO::FETCH_ASSOC);
    
            if (!$turma) {
                return ["erro" => "Turma não encontrada"];
            }
    
            $idTurma = $turma['id'];
    
            $sqlInsert = "INSERT INTO chamada (presenca, id_turma, id_aluno) VALUES (1, :id_turma, :id_aluno)";
            $stmtInsert = $this->conn->prepare($sqlInsert);
    
            foreach ($ids as $idAluno) {
                $stmtInsert->bindParam(":id_turma", $idTurma);
                $stmtInsert->bindParam(":id_aluno", $idAluno);
                $stmtInsert->execute();
            }
    
            return ["sucesso" => true, "mensagem" => "Presenças registradas com sucesso"];
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }
    
}