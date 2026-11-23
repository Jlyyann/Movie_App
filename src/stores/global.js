import { defineStore } from 'pinia'
import { reactive } from 'vue'
import api from '../api'

export const useGlobalStore = defineStore('global', () => {
  const user = reactive({
    token: localStorage.getItem('token'),
    email: null,
    isAdmin: false,
  })

  async function getUserDetails() {
    if (!user.token) return

    const { data } = await api.get('/users/details')
    user.email = data.user.email
    user.isAdmin = data.user.isAdmin
  }

  function setToken(token) {
    localStorage.setItem('token', token)
    user.token = token
  }

  function clearUser() {
    localStorage.removeItem('token')
    user.token = null
    user.email = null
    user.isAdmin = false
  }

  return { user, getUserDetails, setToken, clearUser }
})
