<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import api from '../api'
import MovieCard from '../components/MovieCard.vue'
import { useGlobalStore } from '../stores/global'

const movies = ref([])
const displayedMovies = ref([])
const featuredMovie = ref({
  title: 'Your next story starts here',
  genre: 'Movie Catalog',
  year: '',
  director: 'CineShelf',
  description: 'Browse the catalog and discover a movie for your next watch.',
})
const search = ref('')
const { user } = useGlobalStore()

async function getMovies() {
  try {
    const { data } = await api.get('/movies/getMovies')
    movies.value = data.movies
    displayedMovies.value = data.movies
    featuredMovie.value = data.movies[0]
  } catch (error) {
    console.error(error)
  }
}

watch(search, (newSearch) => {
  displayedMovies.value = movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(newSearch.toLowerCase())
  )
})

onBeforeMount(() => getMovies())
</script>

<template>
  <div class="home-page">
    <section class="home-hero">
      <img
        class="hero-backdrop"
        src="/images/cinema-hero.png"
        alt="Colorful cinematic theater"
      />
      <div class="hero-shade"></div>
      <div class="hero-content container">
        <span class="hero-label">Featured movie</span>
        <h1>{{ featuredMovie.title }}</h1>
        <p class="hero-meta">{{ featuredMovie.genre }} - Directed by {{ featuredMovie.director }}</p>
        <p class="hero-copy">{{ featuredMovie.description }}</p>
        <div class="d-flex flex-wrap gap-2">
          <RouterLink v-if="user.token && featuredMovie._id" class="btn btn-danger px-4" :to="`/movies/${featuredMovie._id}`">
            <i class="bi bi-play-fill me-1"></i>View Movie
          </RouterLink>
          <RouterLink v-else-if="!user.token" class="btn btn-danger px-4" to="/login">Login to View</RouterLink>
          <RouterLink v-else class="btn btn-danger px-4" to="/movies">Explore Movies</RouterLink>
          <RouterLink class="btn btn-outline-light px-4" to="/movies">Browse Movies</RouterLink>
        </div>
      </div>
    </section>

    <section class="home-catalog container">
      <div class="home-section-heading">
        <div>
          <p class="eyebrow">Available now</p>
          <h2>Movie catalog</h2>
        </div>
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input id="homeMovieSearch" v-model="search" type="search" placeholder="Search movies" />
        </div>
      </div>

      <div v-if="displayedMovies.length > 0" class="row g-4">
        <div v-for="movie in displayedMovies.slice(0, 4)" :key="movie._id" class="col-6 col-md-4 col-lg-3">
          <MovieCard :movie="movie" />
        </div>
      </div>
      <div v-else-if="search" class="empty-state">No movie matches "{{ search }}".</div>

      <div class="text-center mt-5">
        <RouterLink class="btn btn-outline-primary px-4" to="/movies">View All Movies</RouterLink>
      </div>
    </section>
  </div>
</template>
