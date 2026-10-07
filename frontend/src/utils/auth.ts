const TOKEN_KEY = 'kurumi:token';
const NAME_KEY = 'kurumi:name';

// O jogo funciona sem login (modo convidado). Estar logado só guarda o nome e o token da sessão.
export function saveSession(token: string | null, name: string) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(NAME_KEY, name);
  } catch {
    // localStorage pode estar indisponível (modo privado); seguimos sem sessão.
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
  } catch {
    // ignora
  }
}

export function getUserName(): string | null {
  try {
    return localStorage.getItem(NAME_KEY);
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}
