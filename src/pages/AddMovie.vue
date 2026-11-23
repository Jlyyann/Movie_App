<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import AddMovieForm from '../components/AddMovieForm.vue'
import { useGlobalStore } from '../stores/global'

const router = useRouter()
const store = useGlobalStore()

onBeforeMount(async () => {
  try {
    await store.getUserDetails()
    if (!store.user.isAdmin) router.push({ path: '/movies' })
  } catch (error) {
    router.push({ path: '/login' })
  }
})
</script>

<template>
  <div class="form-page">
    <p class="eyebrow">Admin only</p>
    <h1>Add a movie</h1>
    <p class="text-secondary">Complete all catalog information below.</p>
    <AddMovieForm class="mt-4" />
  </div>
</template>
