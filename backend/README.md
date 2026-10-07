# Kurumi - Backend

API REST para cadastro, login e gerenciamento de usuários (com endereço) do jogo Kurumi.

**Stack:** Node.js, Express 5, Sequelize, SQLite, JWT, bcrypt, Swagger, Jest + Supertest.

## Rotas

| Método | Rota             | Auth | Descrição                          |
| ------ | ---------------- | ---- | ---------------------------------- |
| POST   | `/users`         | Não  | Cadastra um usuário                |
| POST   | `/users/login`   | Não  | Login (retorna o usuário e o JWT)  |
| GET    | `/users/profile` | Sim  | Dados do usuário logado            |
| PUT    | `/users`         | Sim  | Atualiza o usuário logado          |
| DELETE | `/users`         | Sim  | Remove o usuário logado            |

A documentação interativa (Swagger) fica em `/api-docs`. Rotas autenticadas usam o header `Authorization: Bearer <token>`.

## Tabela `Users`

- id (int, primary key)
- nickname (varchar(30), not null, único)
- email (varchar, not null, único)
- password (varchar, not null — guardada com hash bcrypt)
- cep (varchar(9), not null)
- street, neighborhood, city (varchar, not null)
- state (varchar(2), not null — sigla, ex.: `AL`; a API também aceita o nome completo, como `Alagoas`, e converte)
- createdAt, updatedAt (date)

## Como rodar

**Requisitos:** Node.js 22 ou posterior.

```bash
# 1. Instale as dependências (o projeto usa Yarn; para instalar: npm install -g yarn)
yarn

# 2. Crie o arquivo de configuração e preencha SALT e JWT_PASS
cp .env.example .env

# 3. Inicie o servidor (a tabela Users é criada automaticamente)
yarn start
```

Depois acesse o link que aparecer no console (por padrão `http://localhost:3000/api-docs`).

Variáveis do `.env`: veja os comentários em `.env.example`. `SALT` e `JWT_PASS` são obrigatórias — o servidor não inicia sem elas. Em produção, defina também `CORS_ORIGIN` com o endereço do frontend.

### Migrations (opcional)

O servidor já cria a tabela sozinho. Se preferir usar migrations:

```bash
npx sequelize-cli db:migrate
```

## Testes

```bash
yarn test
```

Os testes usam um banco SQLite em memória e não alteram o banco de desenvolvimento.


