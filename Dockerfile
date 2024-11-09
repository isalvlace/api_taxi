FROM node:20.18.0

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json (para instalar dependências)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Instale o knex globalmente para garantir que o comando knex esteja disponível
RUN npm install -g knex

# Baixar o script wait-for-it para aguardar o MySQL
RUN curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod +x /usr/local/bin/wait-for-it

# Copie o restante do código da API para dentro do container
COPY . .

# Exponha a porta onde a API roda
EXPOSE 3000

# Comando para rodar as migrações e iniciar a API
CMD ["sh", "-c", "wait-for-it mysql-container:3306 -- knex migrate:latest --env production && npm start"]