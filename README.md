# API Node.js com MySQL e Docker

Esta é uma API desenvolvida utilizando **Node.js**, **MySQL** e **Docker**, projetada para gerenciar dados e interações relacionadas a passageiros (*passengers*), corridas (*rides*) e motoristas (*drivers*).

## Como Rodar o Projeto

### 1. Clone o repositório
bash<br>
git clone https://github.com/islvlace/api_taxi<br>
cd api_taxi<br>

### Execute Com Docker
docker-compose up --build -d<br>

### Teste os endpoints
Utilize algum cliente http (postman) para acionar as seguintes rotas:<br>
(1) http://localhost:3000/passengers (POST)
    Coloque o json no corpo da requisição:
    {
        "name": "Joana",
        "phone": "11 98578-5416"
    }
<br>

(2) http://localhost:3000/drivers (POST)<br>
    {
        "name": "Bruna",
        "car": "Fusca",
        "phone": "11 95542-1245"
    }
<br>

(3) http://localhost:3000/rides (POST)<br>
    {
        "passenger_id": 1, // ou o id de algum passageiro cadastrado
        "origin": "Avenida X, 123",
        "destination": "Avenida Y, 456",
        "price": 51.23
    }
<br>

(4) http://localhost:3000/rides (PATCH)<br>
    Caso STARTED
    {
        "id": 1, // id da corrida que será atualizada
        "status": "started",
        "driver_id": 1, // id do motorista que está atualizando
        "price": 42.65
    }<br> 
    Caso COMPLETED
    {
        "id": 1,
        "status": "completed",
        "driver_id": 1,
        "price": 66.23
    }<br> 

(5) http://localhost:3000/rides/2 (GET)<br>
    Utilize o id da corrida que se pretende pegar
