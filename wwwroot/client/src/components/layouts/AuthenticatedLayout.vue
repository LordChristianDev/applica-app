<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <Sidebar />
    <main class="flex-1 overflow-y-auto">
      <router-view /> 
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/layouts/Sidebar.vue';

const router = useRouter();

// Check if user is authenticated on mount
onMounted(() => {
  const user = localStorage.getItem('user');
  if (!user) {
    router.push('/login');
  }
});
</script>