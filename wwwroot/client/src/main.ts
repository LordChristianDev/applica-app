import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { clerkPlugin } from '@clerk/vue';

import router from './router/router';
import App from './App.vue';
import './index.css';

export const BASE_URL =
	import.meta.env.MODE === "development"
		? "http://localhost:4000/api"
		: `${window.location.origin}/api`;

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error('Add your Clerk Publishable Key to the .env file')
}

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY });

app.mount('#app');