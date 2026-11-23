<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const route = useRoute()
const router = useRouter()
const { user } = useGlobalStore()
const notyf = new Notyf()
const movie = reactive({ data: null })
const comment = ref('')
const isLoading = ref(true)

async function getMovie() {
  const { data } = await api.get(`/movies/getMovie/${route.params.id}`)
  movie.data = data.movie
  isLoading.value = false
}

async function addComment() {
  if (!comment.value.trim()) return

  try {
    await api.post(`/movies/addComment/${route.params.id}`, {
      comment: comment.value,
    })
    comment.value = ''
    notyf.success('Comment added')
    await getMovie()
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Unable to add comment')
  }
}

onBeforeMount(async () => {
  if (!user.token) {
    router.push({ path: '/login' })
    return
  }

  try {
    await getMovie()
  } catch (error) {
    notyf.error('Movie not found')
    router.push({ path: '/movies' })
  }
})
</script>

<template>
  <div class="container py-4 py-lg-5">
  <div v-if="isLoading" class="text-center py-5"><div class="spinner-border text-warning"></div></div>
  <section v-else-if="movie.data" class="movie-detail">
    <RouterLink to="/movies" class="back-link"><i class="bi bi-arrow-left me-2"></i>Back to movies</RouterLink>
    <div class="row g-5 mt-2">
      <div class="col-lg-8">
        <p class="eyebrow">{{ movie.data.genre }} · {{ movie.data.year }}</p>
        <h1>{{ movie.data.title }}</h1>
        <p class="lead text-secondary">Directed by {{ movie.data.director }}</p>
        <p class="movie-copy">{{ movie.data.description }}</p>
      </div>
      <div class="col-lg-4">
        <h2 class="h4">Comments</h2>
        <form class="d-flex gap-2 my-3" @submit.prevent="addComment">
          <input id="addComment" v-model="comment" class="form-control" placeholder="Write a comment" />
          <button class="btn btn-primary">Add</button>
        </form>
        <div v-if="movie.data.comments.length === 0" class="text-secondary">No comments yet.</div>
        <div v-for="item in movie.data.comments" :key="item._id" class="comment-item">
          {{ item.comment }}
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
