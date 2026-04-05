import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  authStore.init();
  if (!authStore.isLoggedIn) {
    return navigateTo('/auth/login');
  }
});
