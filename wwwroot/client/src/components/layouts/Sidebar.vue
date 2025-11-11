<template>
  <aside class="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col h-screen sticky top-0">
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
          <img src="/applica.png" alt="Applica" class="w-8 h-8 object-contain"/>
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-900">Applica</h1>
          <p class="text-xs text-gray-500">Track your journey</p>
        </div>
      </div>
    </div>

    <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.path"
        class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
        :class="{ 'bg-blue-50 text-blue-700 font-medium': $route.path === item.path }"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="p-4 border-t border-gray-200">
      <div class="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-4">
        <p class="text-sm font-medium text-gray-900 mb-1">{{ totalApplications }} Applications</p>
        <p class="text-xs text-gray-600">Keep up the great work!</p>
      </div>
    </div>

    <div class="p-4 border-t border-gray-200">
      <button 
        @click="close" 
        class="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white border-2 border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </aside>

  <!-- Mobile Drawer using PrimeVue -->
  <Drawer v-model:visible="visible" class="md:hidden w-64">
    <template #header>
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-linear-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
          <img src="/applica.png" alt="Applica" class="w-8 h-8 object-contain"/>
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-900">Applica</h1>
          <p class="text-xs text-gray-500">Track your journey</p>
        </div>
      </div>
    </template>

    <nav class="space-y-1">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.path"
        @click="visible = false"
        class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
        :class="{ 'bg-blue-50 text-blue-700 font-medium': $route.path === item.path }"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </router-link>
    </nav>

    <template #footer>
      <div class="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-4">
        <p class="text-sm font-medium text-gray-900 mb-1">{{ totalApplications }} Applications</p>
        <p class="text-xs text-gray-600">Keep up the great work!</p>
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import {useClerk } from '@clerk/vue';
  import Drawer from 'primevue/drawer';

  import { useAuth as useUserAuth } from '@/composables/providers/useAuth';
  import { useRoutes } from '@/composables/useRoutes';
  import { useApplications } from '@/composables/useApplications';

  import ChartIcon from "@/assets/icons/ChartIcon.vue";
  import SettingsIcon from "@/assets/icons/SettingsIcon.vue";
  import DashboardIcon from "@/assets/icons/DashboardIcon.vue";

  const clerk = useClerk();
  const { move } = useRoutes();
  const { signOut } = useUserAuth();

  const { totalApplications } = useApplications();
  const visible = ref(false);

  const close = async () => {
    await clerk.value?.signOut();
    await signOut();
    move('/login');
  };

  const navigation = computed(() => [
    {
      name: 'Dashboard',
      path: '/',
      icon: DashboardIcon
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: ChartIcon
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: SettingsIcon
    }
  ]);
</script>