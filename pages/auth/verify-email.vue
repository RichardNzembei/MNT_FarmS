<template>
  <div class="min-h-screen bg-stone-100 flex flex-col items-center justify-center px-4 py-10">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <UIcon name="i-heroicons-envelope" class="w-7 h-7 text-white" />
        </div>
        <h1 class="text-xl font-bold text-stone-800">Check your email</h1>
        <p class="text-sm text-stone-500 mt-1">We sent a verification link to</p>
        <p class="text-sm font-semibold text-stone-700 mt-0.5">{{ email }}</p>
      </div>

      <div class="bg-white rounded-2xl shadow-sm p-6 space-y-4 text-center">
        <p class="text-sm text-stone-500 leading-relaxed">
          Click the link in the email to verify your account, then sign in below.
        </p>

        <div v-if="resent" class="px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
          Verification email resent!
        </div>
        <div v-if="resendError" class="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {{ resendError }}
        </div>

        <NuxtLink
          to="/auth/login"
          class="block w-full bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 active:bg-emerald-800 transition-colors text-center"
        >
          Go to Sign In
        </NuxtLink>

        <button
          @click="resendEmail"
          :disabled="resending || resent"
          class="w-full text-sm text-stone-500 hover:text-emerald-600 transition-colors disabled:opacity-50 py-1"
        >
          <UIcon v-if="resending" name="i-heroicons-arrow-path" class="w-3.5 h-3.5 animate-spin inline mr-1" />
          {{ resending ? 'Sending...' : "Didn't get it? Resend email" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({ layout: false });

const email = ref('');
const resending = ref(false);
const resent = ref(false);
const resendError = ref('');

onMounted(() => {
  email.value = sessionStorage.getItem('pending_verify_email') || 'your email';
});

const resendEmail = async () => {
  resendError.value = '';
  resending.value = true;
  try {
    const { getFirebaseAuth, sendEmailVerification } = await import('~/plugins/firebase.client');
    const auth = getFirebaseAuth();
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      resent.value = true;
    } else {
      resendError.value = 'Session expired. Please register again.';
    }
  } catch (e) {
    resendError.value = e.code === 'auth/too-many-requests'
      ? 'Too many attempts. Wait a few minutes and try again.'
      : 'Failed to resend. Try again later.';
  } finally {
    resending.value = false;
  }
};
</script>
