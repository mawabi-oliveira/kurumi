# Kurumi

Jogo estilo **Wordle com palavras em Tupi**. Você tem 6 tentativas para descobrir a palavra de 5 letras. O jogo funciona direto, como convidado, e o cadastro/login é opcional.

## Funcionalidades

- Grid de tentativas e teclado virtual (também funciona com o teclado físico)
- Palavras em Tupi sorteadas a cada partida
- Cadastro com endereço preenchido automaticamente pelo CEP (ViaCEP)
- Login com e-mail e senha (JWT) e, opcionalmente, com Google (Firebase)
- API REST documentada com Swagger e testes automatizados

## Tecnologias

| Parte    | Tecnologias                                                      |
| -------- | ---------------------------------------------------------------- |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, React Router 5         |
| Backend  | Node.js 22, Express 5, Sequelize, SQLite, JWT, bcrypt, Swagger   |
| Testes   | Jest e Supertest                                                 |

## Como rodar

Requisitos: Node.js 22 ou superior e Yarn (`npm install -g yarn`).

```bash
# 1. Instalar as dependências (raiz, frontend e backend)
npm run install:all

# 2. Configurar o backend: copie e preencha SALT e JWT_PASS
cp backend/.env.example backend/.env

# 3. Configurar o frontend (o padrão já aponta para http://localhost:3000)
cp frontend/.env.example frontend/.env

# 4. Subir frontend e backend juntos
npm run dev
```

- Frontend: http://localhost:5173
- API e documentação (Swagger): http://localhost:3000/api-docs

Mais detalhes em [`backend/README.md`](backend/README.md) e [`frontend/README.md`](frontend/README.md).

## Testes

```bash
npm test
```

## Equipe Backend

Miguel Laurentino: https://github.com/mgl-uhou
Mayara Lins: https://github.com/luzuramay

## Equipe FrontEnd
Ana Oliveira: https://github.com/mawabi-oliveira
Pedro Cordeiro

Projeto desenvolvido no curso Técnico em Desenvolvimento de Sistemas do IFAL.
