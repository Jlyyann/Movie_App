<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const props = defineProps({ movieId: String })
const title = ref('')
const director = ref('')
const year = ref('')
const description = ref('')
const genre = ref('')
const router = useRouter()
const notyf = new Notyf()

async function handleSubmit() {
  try {
    await api.patch(`/movies/updateMovie/${props.movieId}`, {
      title: title.value,
      director: director.value,
      year: year.value,
      description: description.value,
      genre: genre.value,
    })
    notyf.success('Movie updated')
    router.push({ path: '/admin' })
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Unable to update movie')
  }
}

onBeforeMount(async () => {
  const { data } = await api.get(`/movies/getMovie/${props.movieId}`)
  title.value = data.movie.title
  director.value = data.movie.director
  year.value = data.movie.year
  description.value = data.movie.description
  genre.value = data.movie.genre
})
</script>

<template>
  <form class="movie-form" @submit.prevent="handleSubmit">
    <div class="mb-3"><label for="editTitle" class="form-label">Title</label><input id="editTitle" v-model="title" class="form-control" required /></div>
    <div class="mb-3"><label for="editDirector" class="form-label">Director</label><input id="editDirector" v-model="director" class="form-control" required /></div>
    <div class="row">
      <div class="col-md-6 mb-3"><label for="editYear" class="form-label">Year</label><input id="editYear" v-model="year" type="number" class="form-control" required /></div>
      <div class="col-md-6 mb-3"><label for="editGenre" class="form-label">Genre</label><input id="editGenre" v-model="genre" class="form-control" required /></div>
    </div>
    <div class="mb-4"><label for="editDescription" class="form-label">Description</label><textarea id="editDescription" v-model="description" rows="5" class="form-control" required></textarea></div>
    <button class="btn btn-primary">Update Movie</button>
  </form>
</template>
