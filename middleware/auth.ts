export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // Liste des routes publiques (accessibles sans être connecté)
  const publicRoutes = ['/login', '/signup']

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!user.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // Si l'utilisateur est connecté et essaie d'accéder à login ou signup
  if (user.value && publicRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})