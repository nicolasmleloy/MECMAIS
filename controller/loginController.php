<?php
require_once __DIR__ . "/../config/config/db/database.php";

class LoginController {
    private $conn;

    public function __construct() {
        $banco = new Database();
        $this->conn = $banco->Connect();
    }

    public function BuscarLogin() {
        try {
            $usuarios = [];

            $consultas = [
                "SELECT email, senha, 'aluno' AS tipo FROM aluno",
                "SELECT email, senha, 'professor' AS tipo FROM professor",
                "SELECT email, senha, 'cozinha' AS tipo FROM cozinha",
                "SELECT email, senha, 'admin' AS tipo FROM admin"
            ];

            foreach ($consultas as $sql) {
                $stmt = $this->conn->prepare($sql);
                $stmt->execute();
                $usuarios = array_merge($usuarios, $stmt->fetchAll(PDO::FETCH_ASSOC));
            }

            return $usuarios;
        } catch (\Throwable $th) {
            return [];
        }
    }
}
