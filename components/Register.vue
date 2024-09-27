<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const handleSignUp = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    
    if (error) throw error
    
    successMessage.value = "Inscription réussie ! Vérifiez votre email pour confirmer votre compte."
  } catch (error) {
    errorMessage.value = error.error_description || error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleSignUp">
    <div class="col-6 form-widget">
      <h1 class="header">Inscription</h1>
      <p class="description">Créez un compte avec votre email et mot de passe</p>
      <div>
        <input class="inputField" type="email" placeholder="Votre email" v-model="email" required />
        <input class="inputField" type="password" placeholder="Votre mot de passe" v-model="password" required />
      </div>
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="success">
        {{ successMessage }}
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Chargement...' : 'S\'inscrire'"
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
.success {
  color: green;
  margin-top: 10px;
}
</style>