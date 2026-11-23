<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const email = ref('')
const password = ref('')
const isEnabled = ref(false)
const router = useRouter()
const notyf = new Notyf()
const store = useGlobalStore()

watch([email, password], (currentValue) => {
  isEnabled.value = currentValue.every((input) => input !== '')
})

async function handleSubmit() {
  try {
    const response = await api.post('/users/login', {
      email: email.value,
      password: password.value,
    })

    store.setToken(response.data.access)
    router.push({ path: '/' })
    notyf.success('Login successful')

    try {
      await store.getUserDetails()
    } catch (error) {
      console.error(error)
    }
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Login failed')
  }
}

onBeforeMount(() => {
  if (store.user.token) router.push({ path: '/' })
})
</script>

<template>
  <section class="auth-section">
    <div class="auth-panel">
      <p class="eyebrow">Welcome back</p>
      <h1>Continue browsing.</h1>
      <p class="text-secondary">Log in to view movie details and comments.</p>
      <form class="mt-4" @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="loginEmail" class="form-label">Email address</label>
          <input id="loginEmail" v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-4">
          <label for="loginPassword" class="form-label">Password</label>
          <input id="loginPassword" v-model="password" type="password" class="form-control" required />
        </div>
        <button class="btn btn-primary w-100" :disabled="!isEnabled">Login</button>
      </form>
      <p class="mt-4 mb-0">No account yet? <RouterLink to="/register">Register</RouterLink></p>
    </div>
  </section>
</template>
