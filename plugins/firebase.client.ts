import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  sendEmailVerification,
  updateProfile,
  onIdTokenChanged,
} from 'firebase/auth';
import { useAuthStore } from '~/stores/auth';

let _auth: ReturnType<typeof getAuth> | null = null;
let _googleProvider: GoogleAuthProvider | null = null;

export const getFirebaseAuth = () => _auth!;
export const getGoogleProvider = () => _googleProvider!;
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  sendEmailVerification,
  updateProfile,
};

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey as string,
    authDomain: config.public.firebaseAuthDomain as string,
    projectId: config.public.firebaseProjectId as string,
    storageBucket: config.public.firebaseStorageBucket as string,
    messagingSenderId: config.public.firebaseMessagingSenderId as string,
    appId: config.public.firebaseAppId as string,
  };

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  _auth = getAuth(app);
  _googleProvider = new GoogleAuthProvider();

  const authStore = useAuthStore();

  // Keep token in sync — only persist verified users
  onIdTokenChanged(_auth, async (firebaseUser) => {
    if (firebaseUser && (firebaseUser.emailVerified || firebaseUser.providerData.some(p => p.providerId === 'google.com'))) {
      const idToken = await firebaseUser.getIdToken();
      authStore.setUser(firebaseUser, idToken);
    } else {
      authStore.setUser(null, null);
    }
  });

  return {
    provide: { firebaseAuth: _auth },
  };
});
