<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const user = useSupabaseUser()
</script>
<template>
  <div>
    <Account v-if="user"/>
    <Login v-else/>
    <NuxtLink to="/signup">S'inscrire</NuxtLink>
  </div>
</template>
