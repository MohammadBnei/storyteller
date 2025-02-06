<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
  >
    <UContainer class="py-12">
      <!-- Page Content -->
      <slot />

      <!-- Footer -->
      <footer class="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
        <p>Built with Nuxt 3 and NuxtUI</p>
      </footer>
    </UContainer>
  </div>
</template>
