import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './router/router';
import App from './App.vue';
import './index.css';

export const BASE_URL =
	import.meta.env.MODE === "development"
		? "http://localhost:4000/api"
		: `${window.location.origin}/api`;

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');