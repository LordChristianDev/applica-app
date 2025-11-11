<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <Sidebar />
    <main class="flex-1 overflow-y-auto">
      <router-view /> 
    </main>
  </div>
</template>

<script setup lang="ts">
  import Sidebar from '@/components/layouts/Sidebar.vue';
</script>