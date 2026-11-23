<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import api from '../api'
import MovieCard from '../components/MovieCard.vue'

const movies = ref([])
const filteredMovies = ref([])
const search = ref('')
const isLoading = ref(true)
const errorMessage = ref('')

async function getMovies() {
  try {
    const { data } = await api.get('/movies/getMovies')
    movies.value = data.movies
    filteredMovies.value = data.movies
  } catch (error) {
    errorMessage.value = 'Unable to load movies. Make sure the API is running.'
  } finally {
    isLoading.value = false
  }
}

watch(search, (newSearch) => {
  filteredMovies.value = movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(newSearch.toLowerCase())
  )
})

onBeforeMount(() => getMovies())
</script>

<template>
  <div class="container py-4 py-lg-5">
    <section class="catalog-heading">
      <div>
        <p class="eyebrow">Movie catalog</p>
        <h1>Find your next movie.</h1>
      </div>
      <div class="search-box">
        <i class="bi bi-search"></i>
        <input id="movieSearch" v-model="search" type="search" placeholder="Search by movie title" />
      </div>
    </section>

    <div v-if="isLoading" class="text-center py-5"><div class="spinner-border text-danger"></div></div>
    <div v-else-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-else-if="movies.length === 0" class="empty-state">No movies have been added yet.</div>
    <div v-else-if="filteredMovies.length === 0" class="empty-state">No movie matches “{{ search }}”.</div>
    <div v-else class="row g-4">
      <div v-for="movie in filteredMovies" :key="movie._id" class="col-6 col-md-4 col-lg-3">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
</template>
