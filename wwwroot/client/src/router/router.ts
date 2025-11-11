import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Reports from '@/views/Reports.vue';
import Settings from '@/views/Settings.vue';

import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: { layout: 'guest' }
		},
		{
			path: '/',
			component: AuthenticatedLayout,
			meta: { requiresAuth: true },
			children: [
				{
					path: '',
					name: 'dashboard',
					component: Dashboard
				},
				{
					path: 'reports',
					name: 'reports',
					component: Reports
				},
				{
					path: 'settings',
					name: 'settings',
					component: Settings
				}
			]
		}
	]
});

router.beforeEach((to, from, next) => {
	const user = localStorage.getItem('currentUser');
	const isAuthenticated = !!(user && user !== 'null');

	console.log("Auth: ", isAuthenticated);

	if (to.meta.requiresAuth && !isAuthenticated) {
		next({ name: 'login', query: { redirect: to.fullPath } })
	} else if (to.name === 'login' && isAuthenticated) {
		next({ name: 'dashboard' })
	} else {
		next()
	}
})

export default router;