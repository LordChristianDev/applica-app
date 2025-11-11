<script setup lang="ts">
    import { watch, computed} from 'vue';
    import { SignInButton, useUser } from '@clerk/vue';
    import { useQuery } from '@tanstack/vue-query';
    
    import { useAuth } from '@/composables/providers/useAuth';
    import { useRoutes } from '@/composables/useRoutes';

    import { CONTROLLER as USER_CONTROLLER } from '@/stores/services/user-services';

    const { move } = useRoutes();
    const { isSignedIn, isLoaded, user } = useUser();
    const { currentUser, storeUser, signOut } = useAuth();

    const { data, isFetching, isError } = useQuery({
      queryKey: ['login-user', user?.value?.id],
      queryFn: async () => USER_CONTROLLER.FetchUserByUID(user.value?.id ?? ''),
      enabled: computed(() => isLoaded.value && isSignedIn.value && !!user.value?.id),
      staleTime: 0,
      retry: 1,
    });

    watch([isLoaded, isSignedIn], async () => {
      if (!isLoaded) {
        return;
      }

      if (!isSignedIn) {
        await signOut();
        move('/login');
      }
    });

    watch([currentUser, user], () => {
      if ((currentUser.value as any).id && user?.value?.id) {
        move('/');
      }
    });

    watch([isLoaded, isSignedIn, user, data, isFetching, isError], async () => {
      if (!isLoaded.value || !isSignedIn.value || !user.value?.id) return;

      if (isFetching.value) {
        return;
      }

      if (data.value) {
        storeUser(data.value);
        return;
      }

      if (data.value === null) {
        await handleCreateUser();
      }
    });

    const handleCreateUser = async () => {
      try {
        const newUser = await USER_CONTROLLER.SetupNewUser(user.value?.id ?? '');
        if (newUser) {
          storeUser(newUser);
        } else {
          throw new Error('Failed to create user');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        await signOut();
        move('/');
      }
    };
</script>

<template>
  <div 
    class="min-h-screen w-full flex items-center justify-center p-4"
    :style="{
      backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <!-- Login Card -->
    <div class="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">

      <!-- Logo/Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
           <img src="/applica.png" alt="Applica" class="w-14 h-14 object-contain"/>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">
        Welcome Back
      </h1>
      
      <!-- Subtitle -->
      <p class="text-center text-gray-600 mb-8">
        Login with your account to continue
      </p>

      <!-- Divider -->
      <div class="relative mb-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-white text-gray-500">Sign in with</span>
        </div>
      </div>

      <SignInButton>
        <button
          @click="isFetching = true"
          :disabled="isFetching"
          class="w-full bg-white border-2 border-gray-300 rounded-lg px-6 py-3 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-gray-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          <!-- Loading Spinner -->
          <svg 
            v-if="isFetching" 
            class="w-5 h-5 animate-spin text-gray-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          
          <!-- Google Icon -->
          <svg v-else class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          
          <span>{{ isFetching ? 'Signing in...' : 'Continue with Google' }}</span>
        </button>
      </SignInButton>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-500 mt-6">
        By continuing, you agree to our 
        <a href="#" class="text-blue-600 hover:underline">Terms of Service</a>
        and 
        <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
      </p>
    </div>
  </div>
</template>