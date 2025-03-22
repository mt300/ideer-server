# Ideer Server

Este é um projeto Node.js que utiliza Docker para facilitar a execução do banco de dados PostgreSQL.

## 📥 Como clonar o repositório

```
git clone https://github.com/mt300/ideer-server.git
cd ideer-server
```
📦 Instalar as dependências
```
pnpm install
```
⚙️ Criar o arquivo .env
Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias.
```
//.env
JWT_SECRET=
OPENAI_API_KEY=
```
🐳 Rodar o Docker Compose
```
docker-compose up -d
```
Isso iniciará os serviços necessários, como banco de dados, caso configurado no ```docker-compose.yml```.

🚀 Rodar a aplicação
```
pnpm start
```
A aplicação estará disponível em http://localhost:3000 (ou na porta definida no .env).

📌 Comandos úteis
Parar os containers Docker:


🛠 Tecnologias usadas
Node.js

Express

Docker

PostgreSQL

pnpm

Feito com ❤️ por ```Matheus Tomazi```