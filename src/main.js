import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'notyf/notyf.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import HomePage from './pages/HomePage.vue'
import MoviesPage from './pages/MoviesPage.vue'
import MovieDetails from './pages/MovieDetails.vue'
import RegisterPage from './pages/RegisterPage.vue'
import LoginPage from './pages/LoginPage.vue'
import AdminDashboard from './pages/AdminDashboard.vue'
import AddMovie from './pages/AddMovie.vue'
import EditMovie from './pages/EditMovie.vue'
import ErrorPage from './pages/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/movies', name: 'Movies', component: MoviesPage },
    { path: '/movies/:id', name: 'MovieDetails', component: MovieDetails },
    { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
    { path: '/addMovie', name: 'AddMovie', component: AddMovie },
    { path: '/updateMovie/:id', name: 'EditMovie', component: EditMovie },
    { path: '/:catchAll(.*)', name: 'NotFound', component: ErrorPage },
  ],
})

createApp(App).use(createPinia()).use(router).mount('#app')
