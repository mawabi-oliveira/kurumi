const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// O login com Google só aparece se o Firebase estiver configurado no .env
export const googleLoginEnabled = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

export default {
  googleLogar: async () => {
    if (!googleLoginEnabled) return null;
    try {
      // Import dinâmico: o Firebase só é carregado quando a pessoa clica no botão.
      const { initializeApp, getApps, getApp } = await import('firebase/app');
      const { getAuth, GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');

      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      const result = await signInWithPopup(getAuth(app), new GoogleAuthProvider());
      return result;
    } catch (error) {
      console.error('Erro no login com Google:', error);
      return null;
    }
  },
};
