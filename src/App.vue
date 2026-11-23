<script setup>
import { onBeforeMount } from 'vue'
import NavbarComponent from './components/NavbarComponent.vue'
import { useGlobalStore } from './stores/global'

const { getUserDetails, clearUser } = useGlobalStore()

onBeforeMount(async () => {
  if (localStorage.getItem('token')) {
    try {
      await getUserDetails()
    } catch (error) {
      clearUser()
    }
  }
})
</script>

<template>
  <NavbarComponent />
  <main>
    <RouterView />
  </main>
</template>
