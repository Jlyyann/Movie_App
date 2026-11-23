<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const title = ref('')
const director = ref('')
const year = ref('')
const description = ref('')
const genre = ref('')
const isEnabled = ref(false)
const router = useRouter()
const notyf = new Notyf()

watch([title, director, year, description, genre], (currentValue) => {
  isEnabled.value = currentValue.every((input) => input !== '')
})

async function handleSubmit() {
  try {
    await api.post('/movies/addMovie', {
      title: title.value,
      director: director.value,
      year: year.value,
      description: description.value,
      genre: genre.value,
    })
    notyf.success('Movie added')
    router.push({ path: '/admin' })
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Unable to add movie')
  }
}
</script>

<template>
  <form class="movie-form" @submit.prevent="handleSubmit">
    <div class="mb-3"><label for="title" class="form-label">Title</label><input id="title" v-model="title" class="form-control" /></div>
    <div class="mb-3"><label for="director" class="form-label">Director</label><input id="director" v-model="director" class="form-control" /></div>
    <div class="row">
      <div class="col-md-6 mb-3"><label for="year" class="form-label">Year</label><input id="year" v-model="year" type="number" class="form-control" /></div>
      <div class="col-md-6 mb-3"><label for="genre" class="form-label">Genre</label><input id="genre" v-model="genre" class="form-control" /></div>
    </div>
    <div class="mb-4"><label for="description" class="form-label">Description</label><textarea id="description" v-model="description" rows="5" class="form-control"></textarea></div>
    <button class="btn btn-primary" :disabled="!isEnabled">Add Movie</button>
  </form>
</template>
