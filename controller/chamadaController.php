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
            $mensagens = [];
    
            $sqlCheckTurma = "SELECT COUNT(*) FROM chamada WHERE id_turma = :id_turma";
            $stmtCheckTurma = $this->conn->prepare($sqlCheckTurma);
            $stmtCheckTurma->bindParam(":id_turma", $idTurma);
            $stmtCheckTurma->execute();
            $existeTurma = $stmtCheckTurma->fetchColumn();

            if($existeTurma !== 0){
                $mensagens[] = "Turma ($nomeTurma) já realizou chamada!";
            }else{
                $sqlCheck = "SELECT COUNT(*) FROM chamada WHERE id_turma = :id_turma AND id_aluno = :id_aluno";
                $stmtCheck = $this->conn->prepare($sqlCheck);
        
                $sqlInsert = "INSERT INTO chamada (presenca, id_turma, id_aluno) VALUES (1, :id_turma, :id_aluno)";
                $stmtInsert = $this->conn->prepare($sqlInsert);
        
        
                foreach ($ids as $idAluno) {
                    $stmtCheck->bindParam(":id_turma", $idTurma);
                    $stmtCheck->bindParam(":id_aluno", $idAluno);
                    $stmtCheck->execute();
                    $existe = $stmtCheck->fetchColumn();
        
                    if ($existe == 0) {
                        $stmtInsert->bindParam(":id_turma", $idTurma);
                        $stmtInsert->bindParam(":id_aluno", $idAluno);
                        $stmtInsert->execute();
                    } else {
                        $mensagens[] = "Presença já registrada anteriormente para o aluno de ID ($idAluno).";
                    } 
            }
            }
    
            return ["sucesso" => true, "mensagens" => $mensagens];
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }
    

    public function ResetarChamada(){
        
    }
    
}