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
    FOREIGN KEY (id_turma) REFERENCES TURMA(id),
    FOREIGN KEY (id_aluno) REFERENCES ALUNO(id)
);

CREATE TABLE COZINHA(
    id int PRIMARY KEY AUTO_INCREMENT,
    email varchar(250),
    senha varchar(20)
);

CREATE TABLE NOTIFICACAO(
    id int PRIMARY KEY AUTO_INCREMENT,
    titulo varchar(250),
    mensagem varchar(250)
);

CREATE TABLE PROFESSOR(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(250) NOT NULL,
    email varchar(250) NOT NULL,
    senha varchar(20) NOT NULL
);