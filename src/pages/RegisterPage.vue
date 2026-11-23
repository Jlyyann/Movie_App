<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isEnabled = ref(false)
const router = useRouter()
const notyf = new Notyf()
const { user } = useGlobalStore()

watch([email, password, confirmPassword], (currentValue) => {
  isEnabled.value = currentValue.every((input) => input !== '') && password.value === confirmPassword.value
})

async function handleSubmit() {
  try {
    const response = await api.post('/users/register', {
      email: email.value,
      password: password.value,
    })

    notyf.success(response.data.message)
    router.push({ path: '/login' })
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Registration failed')
  }
}

onBeforeMount(() => {
  if (user.token) router.push({ path: '/movies' })
})
</script>

<template>
  <section class="auth-section">
    <div class="auth-panel">
      <p class="eyebrow">Create account</p>
      <h1>Start your watchlist.</h1>
      <p class="text-secondary">Register using your email and password.</p>
      <form class="mt-4" @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="registerEmail" class="form-label">Email address</label>
          <input id="registerEmail" v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="registerPassword" class="form-label">Password</label>
          <input id="registerPassword" v-model="password" type="password" class="form-control" required />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="form-label">Confirm password</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" class="form-control" required />
        </div>
        <button class="btn btn-primary w-100" :disabled="!isEnabled">Register</button>
      </form>
      <p class="mt-4 mb-0">Already registered? <RouterLink to="/login">Login</RouterLink></p>
    </div>
  </section>
</template>
