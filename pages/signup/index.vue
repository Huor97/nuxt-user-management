<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const user = useSupabaseUser()
</script>
<template>
    <Register v-if="!user" />
    <NuxtLink to="/login">Se connecter</NuxtLink>
</template>