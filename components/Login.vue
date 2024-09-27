<script setup lang="ts">
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const password = ref('')
const errorMessage = ref('')
        
const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: email.value, 
      password: password.value 
    })
    if (error) throw error
    console.log('Connexion réussie!');
    // Ici, vous pourriez rediriger l'utilisateur ou mettre à jour l'état de l'application
  } catch (error: any) {
    if (error.message === 'Identifier ou mot de passe incorrect.') {
      errorMessage.value = 'Email ou mot de passe incorrect.'
    } else {
      errorMessage.value = error.error_description || error.message;
    }

  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Connexion</h1>
      <p class="description">Connectez-vous avec votre email et mot de passe</p>
      <div>
        <input class="inputField" type="email" placeholder="Votre email" v-model="email" required />
        <input class="inputField" type="password" placeholder="Votre mot de passe" v-model="password" required />
      </div>
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Chargement...' : 'Se connecter'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
.signup-link {
  margin-top: 20px;
  text-align: center;
}
</style>