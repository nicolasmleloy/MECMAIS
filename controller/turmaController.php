<?php
require_once __DIR__ . "/../config/config/db/database.php";

class TurmaController{

    private $conn;

    public function __construct(){
        $banco = new Database();

        $this->conn = $banco->Connect();
    }

    public function BuscarTodasTurmas(){
        try {
            $sql = "SELECT nome_turma FROM turma ORDER BY nome_turma";
            $db = $this->conn->prepare($sql);
            $db->execute();
            $resultTurma = $db->fetchAll(PDO::FETCH_ASSOC);

            if ($db->execute()) {
                return $resultTurma;
            } else {
                return false;
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function CreateTurma($nome_turma){
        try {
            $sqlTurma = "SELECT COUNT(nome_turma) AS total FROM turma WHERE nome_turma = :nome_turma";
            $db = $this->conn->prepare($sqlTurma);
            $db->bindParam(":nome_turma", $nome_turma);
            $db->execute();
            $resultTurma = $db->fetch(PDO::FETCH_ASSOC);
            
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

    public function UpdateTurma($nome_turma_atual, $nome_turma_editado){
        try{
            $sqlTurma = "UPDATE turma SET nome_turma = :nome_turma_editado WHERE nome_turma = :nome_turma_atual";
            $db = $this->conn->prepare($sqlTurma);
            $db->bindParam(":nome_turma_atual", $nome_turma_atual);
            $db->bindParam(":nome_turma_editado", $nome_turma_editado);
            $db->execute();
            
            if ($db->execute()) {
                return true;
            } else {
                return false;
            }
        }catch(\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function DeleteTurma($nome_turma){
        try{
            $this->conn->beginTransaction();

            $sqlBuscaId = "SELECT id FROM turma WHERE nome_turma = :nome_turma LIMIT 1";
            $stmtBusca = $this->conn->prepare($sqlBuscaId);
            $stmtBusca->bindParam(":nome_turma", $nome_turma);
            $stmtBusca->execute();
            $resultado = $stmtBusca->fetch(PDO::FETCH_ASSOC);

            if (!$resultado) {
                $this->conn->rollBack();
                return "Turma não encontrada";
            }

            $id_turma = $resultado['id'];

            $sqlDeleteAlunos = "DELETE FROM aluno WHERE id_turma = :id_turma";
            $stmtAlunos = $this->conn->prepare($sqlDeleteAlunos);
            $stmtAlunos->bindParam(":id_turma", $id_turma);
            $stmtAlunos->execute();

            $sqlDeleteTurma = "DELETE FROM turma WHERE id = :id_turma";
            $stmtTurma = $this->conn->prepare($sqlDeleteTurma);
            $stmtTurma->bindParam(":id_turma", $id_turma);
            $stmtTurma->execute();

            $this->conn->commit();
            return $nome_turma;
        }catch(\Throwable $th) {
            return $th->getMessage();
        }
    }
}