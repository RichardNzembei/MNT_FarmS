<template>
  <div class="min-h-screen bg-stone-100 flex flex-col items-center justify-center px-4 py-10">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <UIcon name="i-heroicons-building-office-2" class="w-7 h-7 text-white" />
        </div>
        <h1 class="text-xl font-bold text-stone-800">Create Account</h1>
        <p class="text-sm text-stone-500 mt-1">We'll set up your farm automatically</p>
      </div>

      <div class="bg-white rounded-2xl shadow-sm p-6 space-y-3">
        <!-- First Name -->
        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1.5">First Name <span class="text-red-500">*</span></label>
          <input
            v-model.trim="form.firstName"
            type="text"
            placeholder="e.g. Reuben"
            class="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-stone-400"
            :class="{ 'border-red-400': errors.firstName }"
          />
          <p v-if="errors.firstName" class="mt-1 text-xs text-red-500">{{ errors.firstName }}</p>
        </div>

        <!-- Farm name preview -->
        <div v-if="form.firstName" class="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-xl">
          <UIcon name="i-heroicons-building-office-2" class="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span class="text-sm text-emerald-700">Your farm: <strong>{{ form.firstName }}'s Farm</strong></span>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1.5">Email <span class="text-red-500">*</span></label>
          <input
            v-model.trim="form.email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-stone-400"
            :class="{ 'border-red-400': errors.email }"
          />
          <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1.5">Password <span class="text-red-500">*</span></label>
          <input
            v-model="form.password"
            type="password"
            placeholder="At least 6 characters"
            class="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-stone-400"
            :class="{ 'border-red-400': errors.password }"
          />
          <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password }}</p>
        </div>

        <!-- Server error -->
        <div v-if="serverError" class="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {{ serverError }}
        </div>

        <!-- Submit -->
        <button
          @click="registerEmail"
          :disabled="!!loading"
          class="w-full bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 active:bg-emerald-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          <UIcon v-if="loading === 'email'" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
          {{ loading === 'email' ? 'Setting up your farm...' : 'Create Account' }}
        </button>

        <!-- Divider -->
        <div class="flex items-center gap-3">
          <div class="flex-1 h-px bg-stone-200"></div>
          <span class="text-xs text-stone-400">or</span>
          <div class="flex-1 h-px bg-stone-200"></div>
        </div>

        <!-- Google -->
        <button
          @click="registerGoogle"
          :disabled="!!loading"
          class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-stone-200 rounded-xl bg-white text-stone-700 text-sm font-medium hover:bg-stone-50 active:bg-stone-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <UIcon v-if="loading === 'google'" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin text-stone-500" />
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {{ loading === 'google' ? 'Setting up...' : 'Continue with Google' }}
        </button>

        <p class="text-center text-sm text-stone-500 pt-1">
          Already have an account?
          <NuxtLink to="/auth/login" class="text-emerald-600 font-medium hover:text-emerald-700">Sign in</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

definePageMeta({ layout: false, middleware: 'guest' });

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({ firstName: '', email: '', password: '' });
const errors = reactive({ firstName: '', email: '', password: '' });
const loading = ref('');
const serverError = ref('');

const validate = () => {
  Object.keys(errors).forEach((k) => (errors[k] = ''));
  let ok = true;
  if (!form.firstName) { errors.firstName = 'First name is required'; ok = false; }
  if (!form.email) { errors.email = 'Email is required'; ok = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = 'Enter a valid email'; ok = false; }
  if (!form.password) { errors.password = 'Password is required'; ok = false; }
  else if (form.password.length < 6) { errors.password = 'At least 6 characters'; ok = false; }
  return ok;
};

const setupFarm = async (user, firstName) => {
  const idToken = await user.getIdToken();
  const res = await $fetch('/api/farms/setup', {
    method: 'POST',
    headers: { Authorization: `Bearer ${idToken}` },
    body: { firstName },
  });
  return res.farmName;
};

const registerEmail = async () => {
  serverError.value = '';
  if (loading.value || !validate()) return;
  loading.value = 'email';
  try {
    const { getFirebaseAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } = await import('~/plugins/firebase.client');
    const auth = getFirebaseAuth();
    const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

    // Set display name and create farm
    await updateProfile(user, { displayName: form.firstName });
    await setupFarm(user, form.firstName);

    // Send verification and sign out until confirmed
    await sendEmailVerification(user);
    await signOut(auth);
    sessionStorage.setItem('pending_verify_email', form.email);
    router.push('/auth/verify-email');
  } catch (e) {
    serverError.value = friendlyError(e.code || e.message);
  } finally {
    loading.value = '';
  }
};

onMounted(async () => {
  try {
    const { getFirebaseAuth, getRedirectResult } = await import('~/plugins/firebase.client');
    const result = await getRedirectResult(getFirebaseAuth());
    if (result?.user) {
      const user = result.user;
      const firstName = user.displayName?.split(' ')[0] || user.email.split('@')[0];
      const farmName = await setupFarm(user, firstName);
      const idToken = await user.getIdToken();
      authStore.setUser(user, idToken, farmName);
      router.push('/');
    }
  } catch (e) {
    if (e.code && e.code !== 'auth/no-auth-event') serverError.value = friendlyError(e.code);
  }
});

const registerGoogle = async () => {
  serverError.value = '';
  if (loading.value) return;
  loading.value = 'google';
  try {
    const { getFirebaseAuth, getGoogleProvider, signInWithRedirect } = await import('~/plugins/firebase.client');
    await signInWithRedirect(getFirebaseAuth(), getGoogleProvider());
    // Page will redirect to Google — result handled in onMounted
  } catch (e) {
    serverError.value = friendlyError(e.code || e.message);
    loading.value = '';
  }
};

const friendlyError = (code) => {
  const map = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/weak-password': 'Password is too weak.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };
  return map[code] || 'Something went wrong. Please try again.';
};
</script>
