<script setup>
import { useGlobalStore } from '../stores/global'

defineProps({
  movie: { type: Object, required: true },
})

const { user } = useGlobalStore()

function getPosterColor(genre) {
  if (genre === 'Action') return 'd94b3d'
  if (genre === 'Fantasy') return '6b5b95'
  if (genre === 'Animation') return '008c95'
  if (genre === 'Science Fiction') return '355c9a'
  return 'c8743f'
}
</script>

<template>
  <div class="card movie-card h-100 border-0">
    <img
      class="movie-poster"
      :src="`https://placehold.co/600x900/${getPosterColor(movie.genre)}/ffffff?font=roboto&text=${encodeURIComponent(movie.title)}`"
      :alt="`${movie.title} placeholder poster`"
    />
    <div class="card-body">
      <span class="movie-genre">{{ movie.genre }}</span>
      <h4 class="card-title mt-2">{{ movie.title }}</h4>
      <p class="text-secondary mb-2">{{ movie.director }} · {{ movie.year }}</p>
      <p class="card-text movie-description">{{ movie.description }}</p>
      <RouterLink v-if="user.token" class="btn btn-danger" :to="`/movies/${movie._id}`">View Movie</RouterLink>
      <RouterLink v-else class="btn btn-outline-primary" to="/login">Login to View</RouterLink>
    </div>
  </div>
</template>
