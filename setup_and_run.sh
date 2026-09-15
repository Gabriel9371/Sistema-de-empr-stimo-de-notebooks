#!/bin/bash
echo "Atualizando pacotes e instalando dependências (Docker e Java 17)..."
sudo apt update
sudo apt install -y openjdk-17-jdk docker.io docker-compose-v2

echo "Iniciando o banco de dados via Docker..."
cd backend
sudo docker compose up -d

echo "Aguardando o banco iniciar..."
sleep 5

echo "Iniciando a aplicação Spring Boot..."
cd emprestimos-notebooks
./mvnw spring-boot:run
