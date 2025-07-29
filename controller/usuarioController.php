<?php
require_once __DIR__ . "/../config/config/db/database.php";

class UsuarioController{

    private $conn;

    public function __construct(){
        $banco = new Database();

        $this->conn = $banco->Connect();
    }

    public function BuscarTodosUsuarios(){
        try {
            $sqlAlunos = "SELECT a.id, a.nome, a.email, a.senha, a.id_turma, 'Aluno(a)' AS tipo, t.nome_turma 
            FROM aluno a 
            LEFT JOIN turma t ON a.id_turma = t.id";
            $stmtAlunos = $this->conn->prepare($sqlAlunos);
            $stmtAlunos->execute();
            $alunos = $stmtAlunos->fetchAll(PDO::FETCH_ASSOC);

            $sqlProfessores = "SELECT id, nome, email, senha, 'Professor(a)' AS tipo FROM professor";
            $stmtProfessores = $this->conn->prepare($sqlProfessores);
            $stmtProfessores->execute();
            $professores = $stmtProfessores->fetchAll(PDO::FETCH_ASSOC);

            $sqlCozinheiros = "SELECT id, nome, email, senha, 'Cozinheiro(a)' AS tipo FROM cozinha";
            $stmtCozinheiros = $this->conn->prepare($sqlCozinheiros);
            $stmtCozinheiros->execute();
            $cozinheiros = $stmtCozinheiros->fetchAll(PDO::FETCH_ASSOC);

            $usuarios = array_merge($alunos, $professores, $cozinheiros);

            return $usuarios;
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
                    $sql = "INSERT INTO cozinha(nome, email, senha)VALUES(:nome, :email, :senha)";
                    $db = $this->conn->prepare($sql);
                    $db->bindParam(":nome",$nome);
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

    public function UpdateUsuario($idUsuario, $tipo_perfil, $nome, $email_antigo, $email_novo, $senha, $turma){
        try {
            if (!in_array($tipo_perfil, ["Aluno(a)", "Professor(a)", "Cozinheiro(a)"])) {
                throw new Exception("Tipo de perfil inválido: " . $tipo_perfil);
            }
    
            if($tipo_perfil == "Aluno(a)") {
                $sqlBuscaTurma = "SELECT id FROM turma WHERE nome_turma = :nome_turma";
                $stmtTurma = $this->conn->prepare($sqlBuscaTurma);
                $stmtTurma->bindParam(":nome_turma", $turma);
                $stmtTurma->execute();
                $resultTurma = $stmtTurma->fetch(PDO::FETCH_ASSOC);
    
                if (!$resultTurma) {
                    throw new Exception("Turma não encontrada: " . $turma);
                }
    
                $id_turma = $resultTurma['id'];
    
                $sqlUpdate = "UPDATE aluno SET nome = :nome, email = :email_novo, senha = :senha, id_turma = :id_turma WHERE id = :id_usuario";
                $stmtUpdate = $this->conn->prepare($sqlUpdate);
                $stmtUpdate->bindParam(":nome", $nome);
                $stmtUpdate->bindParam(":senha", $senha);
                $stmtUpdate->bindParam(":email_novo", $email_novo);
                $stmtUpdate->bindParam(":id_turma", $id_turma);
                $stmtUpdate->bindParam(":id_usuario", $idUsuario);
    
                return $stmtUpdate->execute();
            }
            else if($tipo_perfil == "Professor(a)") {
                $sqlUpdate = "UPDATE professor SET nome = :nome, senha = :senha, email = :email_novo WHERE id = :id_usuario";
                $stmt = $this->conn->prepare($sqlUpdate);
                $stmt->bindParam(":nome", $nome);
                $stmt->bindParam(":email_novo", $email_novo);
                $stmt->bindParam(":senha", $senha);
                $stmt->bindParam(":id_usuario", $idUsuario);
    
                return $stmt->execute();
            }
            else if($tipo_perfil == "Cozinheiro(a)") {
                $sqlUpdate = "UPDATE cozinha SET nome = :nome, senha = :senha, email = :email_novo WHERE id = :id_usuario";
                $stmt = $this->conn->prepare($sqlUpdate);
                $stmt->bindParam(":nome", $nome);
                $stmt->bindParam(":senha", $senha);
                $stmt->bindParam(":email_novo", $email_novo);
                $stmt->bindParam(":id_usuario", $idUsuario);
    
                return $stmt->execute();
            }
    
            return false;
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function DeleteUsuario($idUsuario, $tipo_perfil){
        try{
            if($tipo_perfil === "Aluno(a)"){
                $this->conn->beginTransaction();
                $sql = "DELETE FROM aluno WHERE id = :idUsuario";
            }else if($tipo_perfil === "Professor(a)"){
                $this->conn->beginTransaction();
                $sql = "DELETE FROM professor WHERE id = :idUsuario";
            }else if($tipo_perfil === "Cozinheiro(a)"){
                $this->conn->beginTransaction();
                $sql = "DELETE FROM cozinha WHERE id = :idUsuario";
            }

            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(":idUsuario", $idUsuario);
            $stmt->execute();
            $this->conn->commit();

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }

        }catch(\Throwable $th) {
            return $th->getMessage();
        }
    }
    
}