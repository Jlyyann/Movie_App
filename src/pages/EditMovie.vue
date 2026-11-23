<script setup>
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EditMovieForm from '../components/EditMovieForm.vue'
import { useGlobalStore } from '../stores/global'

const route = useRoute()
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
    <h1>Update movie</h1>
    <p class="text-secondary">Edit the catalog information below.</p>
    <EditMovieForm class="mt-4" :movie-id="route.params.id" />
  </div>
</template>
