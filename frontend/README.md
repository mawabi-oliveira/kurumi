# Kurumi - Frontend

Jogo estilo Wordle com palavras em Tupi, feito com React, TypeScript, Vite e Tailwind CSS.

## Funcionalidades

- Grid de tentativas estilo Wordle e teclado virtual
- Modo convidado: o jogo abre sem precisar de login
- Cadastro e login (opcionais) usando o backend do projeto
- Login com Google via Firebase (opcional)

## Requisitos

- Node.js 22 ou superior
- npm

## Instalação e desenvolvimento

```bash
npm install
cp .env.example .env   # ajuste os valores se precisar
npm run dev
```

Abra no navegador: http://localhost:5173

## Variáveis de ambiente

Veja `.env.example`.

- `VITE_API_URL`: endereço do backend. Em produção, use o endereço do backend publicado.
- `VITE_FIREBASE_*`: configuração do Firebase. Sem esses valores, o botão "Entrar com Google" não aparece e o resto funciona normalmente.

As variáveis `VITE_*` ficam visíveis no navegador, então nunca coloque segredos de verdade nelas. Se usar o login com Google, restrinja a chave do Firebase ao seu domínio e adicione o domínio em *Authentication > Settings > Authorized domains*.

## Build para produção

```bash
npm run build
```

Os arquivos ficam em `dist/`. Em hospedagens como Vercel ou Netlify, defina `VITE_API_URL` nas variáveis de ambiente do projeto antes do build. Como o app usa `BrowserRouter`, configure o redirecionamento de todas as rotas para o `index.html`.
