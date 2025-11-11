import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

export const useRoutes = () => {
	const router = useRouter();
	const route = useRoute();

	const move = (path: string) => router.push(path);
	const back = () => router.back();
	const forward = () => router.forward();

	const replace = (path: string) => router.replace(path);
	const go = (n: number) => router.go(n);

	const path = computed(() => route.path);
	const name = computed(() => route.name);
	const params = computed(() => route.params);
	const query = computed(() => route.query);
	const hash = computed(() => route.hash);
	const fullPath = computed(() => route.fullPath);
	const meta = computed(() => route.meta);
	const matched = computed(() => route.matched);
	const redirectedFrom = computed(() => route.redirectedFrom);

	return {
		move,
		back,
		forward,
		replace,
		go,
		path,
		name,
		params,
		query,
		hash,
		fullPath,
		meta,
		matched,
		redirectedFrom,
	};
};
