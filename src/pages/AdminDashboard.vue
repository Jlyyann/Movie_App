<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const movies = ref([])
const router = useRouter()
const notyf = new Notyf()
const store = useGlobalStore()

async function getMovies() {
  const { data } = await api.get('/movies/getMovies')
  movies.value = data.movies
}

async function deleteMovie(id) {
  const shouldDelete = window.confirm('Delete this movie?')
  if (!shouldDelete) return

  try {
    await api.delete(`/movies/deleteMovie/${id}`)
    notyf.success('Movie deleted')
    await getMovies()
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Unable to delete movie')
  }
}

onBeforeMount(async () => {
  try {
    await store.getUserDetails()

    if (!store.user.isAdmin) {
      router.push({ path: '/movies' })
      return
    }

    await getMovies()
  } catch (error) {
    router.push({ path: '/login' })
  }
})
</script>

<template>
  <div class="container py-4 py-lg-5">
  <div class="page-heading d-flex flex-wrap justify-content-between align-items-end gap-3">
    <div>
      <p class="eyebrow">Admin only</p>
      <h1>Movie management</h1>
      <p class="text-secondary mb-0">Review, update, or remove catalog entries.</p>
    </div>
    <RouterLink class="btn btn-primary" to="/addMovie"><i class="bi bi-plus-lg me-2"></i>Add Movie</RouterLink>
  </div>

  <div class="table-responsive admin-table mt-4">
    <table class="table align-middle mb-0">
      <thead><tr><th>Title</th><th>Director</th><th>Year</th><th>Genre</th><th>Actions</th></tr></thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie._id">
          <td class="fw-semibold">{{ movie.title }}</td>
          <td>{{ movie.director }}</td>
          <td>{{ movie.year }}</td>
          <td>{{ movie.genre }}</td>
          <td class="text-nowrap">
            <RouterLink class="btn btn-sm btn-outline-primary me-2" :to="`/updateMovie/${movie._id}`">Update</RouterLink>
            <button class="btn btn-sm btn-outline-danger" @click="deleteMovie(movie._id)">Delete</button>
          </td>
        </tr>
        <tr v-if="movies.length === 0"><td colspan="5" class="text-center py-4">No movies available.</td></tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
