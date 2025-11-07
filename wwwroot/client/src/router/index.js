import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Reports from '@/views/Reports.vue';
import Settings from '@/views/Settings.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'dashboard',
			component: Dashboard
		},
		{
			path: '/reports',
			name: 'reports',
			component: Reports
		},
		{
			path: '/settings',
			name: 'settings',
			component: Settings
		}
	]
});

export default router;