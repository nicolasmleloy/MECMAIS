<?php
require_once __DIR__ . "/../config/config/db/database.php";

class NotificacaoController{

    private $conn;

    public function __construct(){
        $banco = new Database();

        $this->conn = $banco->Connect();
    }
    
    public function ObterNotificacoesCozinha(){
        try {
            $sql = "SELECT * FROM notificacao WHERE data_notificacao = CURDATE()";
            $sqlPrepare = $this->conn->prepare($sql);
            $sqlPrepare->execute();
            $res = $sqlPrepare->fetchAll(PDO::FETCH_ASSOC);

            return $res;    
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function ObterNotificacoesAluno(){
        try {
            $sql = "SELECT * FROM notificacao WHERE data_notificacao = CURDATE() AND titulo = 'Alerta'";
            $sqlPrepare = $this->conn->prepare($sql);
            $sqlPrepare->execute();
            $res = $sqlPrepare->fetchAll(PDO::FETCH_ASSOC);

            return $res;    
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}