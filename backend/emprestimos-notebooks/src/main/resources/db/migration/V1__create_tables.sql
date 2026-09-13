CREATE TABLE notebook (
    id BIGSERIAL PRIMARY KEY,
    patrimonio VARCHAR(50) NOT NULL UNIQUE,
    modelo VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DISPONIVEL'
);

CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    matricula VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE emprestimo (
    id BIGSERIAL PRIMARY KEY,
    notebook_id BIGINT NOT NULL REFERENCES notebook(id),
    usuario_id BIGINT NOT NULL REFERENCES usuario(id),
    data_emprestimo TIMESTAMP NOT NULL,
    data_devolucao_prevista TIMESTAMP NOT NULL,
    data_devolucao_real TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'ATIVO'
);