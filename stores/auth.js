import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);   // { uid, email, displayName, farmName }
  const token = ref(null);  // Firebase ID token

  const isLoggedIn = computed(() => !!user.value && !!token.value);

  // Called on login/register — farmName comes from Firestore farms collection
  const setUser = (firebaseUser, idToken, farmName = null) => {
    if (!firebaseUser) {
      user.value = null;
      token.value = null;
      if (process.client) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
      return;
    }
    // Prefer passed farmName, then stored farmName (so it survives token refresh), then derive from name
    const existingFarmName = process.client ? JSON.parse(localStorage.getItem('auth_user') || '{}').farmName : null;
    const resolvedFarmName = farmName
      || existingFarmName
      || (firebaseUser.displayName ? `${firebaseUser.displayName.split(' ')[0]}'s Farm` : null)
      || `${firebaseUser.email?.split('@')[0]}'s Farm`
      || 'My Farm';

    user.value = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      farmName: resolvedFarmName,
    };
    token.value = idToken;
    if (process.client) {
      localStorage.setItem('auth_token', idToken);
      localStorage.setItem('auth_user', JSON.stringify(user.value));
    }
  };

  // Restore from localStorage (SSR-safe, used in middleware)
  const init = () => {
    if (!process.client) return;
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
    }
  };

  const logout = async () => {
    if (process.client) {
      const { getFirebaseAuth, signOut } = await import('~/plugins/firebase.client');
      await signOut(getFirebaseAuth());
    }
    user.value = null;
    token.value = null;
    if (process.client) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  };

  return { user, token, isLoggedIn, setUser, init, logout };
});
