<?php
require_once __DIR__ . "/../config/config/db/database.php";

class CardapioController {

    private $conn;

    public function __construct(){
        $banco = new Database();
        $this->conn = $banco->Connect();
    }

    public function buscarIngredientes(){
        try {
            $sql = "SELECT id, nome, tipo_porcao FROM ingredientes";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }

    public function buscarCardapioSemana() {
        try {
            $diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
            $resultado = [];
    
            foreach ($diasSemana as $dia) {
                $sql = "SELECT c.prato, i.nome AS ingrediente
                        FROM cardapio c
                        LEFT JOIN ingredientes i ON i.id = c.id_ingrediente
                        WHERE c.dia_da_semana = :dia";
    
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(":dia", $dia);
                $stmt->execute();
    
                $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if ($rows) {
                    $prato = $rows[0]["prato"];
                    $ingredientes = array_column($rows, "ingrediente");
                    $resultado[$dia] = [
                        "prato" => $prato,
                        "ingredientes" => $ingredientes
                    ];
                } else {
                    $resultado[$dia] = [
                        "prato" => "",
                        "ingredientes" => []
                    ];
                }
            }
    
            return $resultado;
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }

    public function salvarCardapio($data) {
        try {
            $dia = $data["dia"];
            $prato = $data["prato"];
            $ingredientes = $data["ingredientes"]; 
    
            $delete = $this->conn->prepare("DELETE FROM cardapio WHERE dia_da_semana = :dia");
            $delete->bindParam(":dia", $dia);
            $delete->execute();

            foreach ($ingredientes as $idIngrediente) {
                $insert = $this->conn->prepare("INSERT INTO cardapio (dia_da_semana, prato, id_ingrediente) VALUES (:dia, :prato, :idIngrediente)");
                $insert->bindParam(":dia", $dia);
                $insert->bindParam(":prato", $prato);
                $insert->bindParam(":idIngrediente", $idIngrediente);
                $insert->execute();
            }
    
            return ["status" => "sucesso"];
        } catch (\Throwable $th) {
            return ["erro" => $th->getMessage()];
        }
    }
    
    
}
