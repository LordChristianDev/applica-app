<script setup lang="ts">
    import { provideAuth } from '@/composables/providers/useAuth';

    provideAuth();
</script>

<template>
    <router-view />
</template>