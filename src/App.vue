<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Connect to WebSocket when app loads
})
</script>

<template>
  <div id="app" class="h-dvh bg-card-table text-white">
    <RouterView />
  </div>
</template>
