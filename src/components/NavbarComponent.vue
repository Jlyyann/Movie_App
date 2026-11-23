<script setup>
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'

const router = useRouter()
const { user, clearUser } = useGlobalStore()

function logout() {
  clearUser()
  router.push({ path: '/login' })
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/">
        <i class="bi bi-film me-2"></i>CineShelf
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#movieNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="movieNavbar" class="collapse navbar-collapse">
        <div class="navbar-nav ms-auto align-items-lg-center">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <RouterLink class="nav-link" to="/movies">Movies</RouterLink>
          <RouterLink v-if="user.isAdmin" class="nav-link" to="/admin">Admin</RouterLink>
          <RouterLink v-if="user.isAdmin" class="nav-link" to="/addMovie">Add Movie</RouterLink>
          <RouterLink v-if="!user.token" class="nav-link" to="/login">Login</RouterLink>
          <RouterLink v-if="!user.token" class="nav-link" to="/register">Register</RouterLink>
          <button v-if="user.token" class="btn btn-sm btn-outline-light ms-lg-3" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>
