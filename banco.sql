CREATE TABLE ADMIN(
    id int PRIMARY KEY AUTO_INCREMENT,
    email varchar(250),
    senha varchar(20)
);

CREATE TABLE TURMA(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome_turma varchar(100)
);

CREATE TABLE ALUNO(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(250) NOT NULL,
    email varchar(250),
    senha varchar(20),
    id_turma int,
    FOREIGN KEY (id_turma) REFERENCES TURMA(id)
);

CREATE TABLE INGREDIENTES(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(250) NOT NULL,
    porcao int NOT NULL,
    tipo_porcao varchar(10) NOT NULL
);

CREATE TABLE CARDAPIO(
    id int PRIMARY KEY AUTO_INCREMENT,
    prato varchar(250) NOT NULL,
    dia_da_semana varchar(250) NOT NULL,
    id_ingrediente int,
    FOREIGN KEY (id_ingrediente) REFERENCES INGREDIENTES(id)
);

CREATE TABLE CHAMADA(
    id int PRIMARY KEY AUTO_INCREMENT,
    presenca boolean,
    id_turma int,
    id_aluno int,
    data_chamada DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_turma) REFERENCES TURMA(id),
    FOREIGN KEY (id_aluno) REFERENCES ALUNO(id)
);

CREATE TABLE COZINHA(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome  varchar(250),
    email varchar(250),
    senha varchar(20)
);

CREATE TABLE NOTIFICACAO(
    id int PRIMARY KEY AUTO_INCREMENT,
    titulo varchar(250),
    mensagem varchar(250),
    data_notificacao DATE DEFAULT CURRENT_DATE;
);

CREATE TABLE PROFESSOR(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(250) NOT NULL,
    email varchar(250) NOT NULL,
    senha varchar(20) NOT NULL
);

ALTER TABLE chamada ADD COLUMN data_chamada DATE DEFAULT CURRENT_DATE;

INSERT INTO ADMIN (email, senha) VALUES 
('admin', 'admin');

INSERT INTO TURMA (nome_turma) VALUES 
('2024.1.144'), ('2024.1.145'), ('2024.1.146'), 
('2024.1.147'), ('2024.1.148');

INSERT INTO PROFESSOR (nome, email, senha) VALUES 
('Kerolin Antonia', 'kerolin@gmail.com', '12345'),
('Fernanda Silva', 'fernanda@mecmais.com', 'abcd'),
('Roberta Lima', 'roberta@mecmais.com', 'senha123'),
('João Pedro', 'joao@mecmais.com', 'joao321'),
('Vanessa Dias', 'vanessa@mecmais.com', 'vanessa456');

INSERT INTO COZINHA (nome, email, senha) VALUES 
('Marcos Paulo', 'marcos@gmail.com', '12345'),
('Rafael Gomes', 'rafael@mecmais.com', 'rafa987');

INSERT INTO ALUNO (nome, email, senha, id_turma) VALUES
('Nícolas Eloy', 'nicolasAluno@gmail.com', '12345', 1),
('Bruno Lima', 'bruno144@example.com', 'senha123', 1),
('Carla Ferreira', 'carla144@example.com', 'senha123', 1),
('Daniel Rocha', 'daniel144@example.com', 'senha123', 1),
('Henrique Alves', 'henrique144@example.com', 'senha123', 1),
('Isabela Martins', 'isabela145@example.com', 'senha123', 2),
('João Pedro Dias', 'joao145@example.com', 'senha123', 2),
('Karen Oliveira', 'karen145@example.com', 'senha123', 2),
('Olívia Braga', 'olivia145@example.com', 'senha123', 2),
('Pedro Henrique', 'pedro145@example.com', 'senha123', 2),
('Quésia Moura', 'quesia146@example.com', 'senha123', 3),
('Rafael Cunha', 'rafael146@example.com', 'senha123', 3),
('Sara Barbosa', 'sara146@example.com', 'senha123', 3),
('Tiago Lima', 'tiago146@example.com', 'senha123', 3),
('Ursula Martins', 'ursula146@example.com', 'senha123', 3),
('Alan Rocha', 'alan147@example.com', 'senha123', 4),
('Beatriz Moura', 'beatriz147@example.com', 'senha123', 4),
('Caio Tavares', 'caio147@example.com', 'senha123', 4),
('Ian Costa', 'ian148@example.com', 'senha123', 5),
('Juliana Ribeiro', 'juliana148@example.com', 'senha123', 5),
('Kaique Martins', 'kaique148@example.com', 'senha123', 5),
('Larissa Monteiro', 'larissa148@example.com', 'senha123', 5),

INSERT INTO INGREDIENTES (nome, porcao, tipo_porcao) VALUES 
('Arroz', 100, 'g'),
('Feijão', 120, 'g'),
('Frango', 150, 'g'),
('Salada de alface', 50, 'g'),
('Macarrão', 130, 'g'),
('Ovo cozido', 1, 'un'),
('Banana', 1, 'un'),
('Leite', 200, 'ml'),
('Pão francês', 1, 'un'),
('Carne moída', 140, 'g');

INSERT INTO professor(nome, email, senha)VALUES('Kerolin', 'kerolin@gmail.com', '12345');

INSERT INTO cozinha(nome, email, senha) VALUES('Cozinha', 'cozinha@gmail.com', '12345');

INSERT INTO aluno(nome, email, senha, id_turma)VALUES('Marcos', 'marcos@gmail.com', '12345', 20);