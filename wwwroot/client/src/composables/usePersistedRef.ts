import { ref, watch } from 'vue';
import { getItem, setItem } from '@/lib/localStorage';

export function usePersistedRef<T>(key: string, initialValue: T) {
	const state = ref<T>((() => {
		const item = getItem(key);
		return (item as T) || initialValue;
	})());

	watch(
		state,
		(newValue) => {
			setItem(key, newValue);
		},
		{ deep: true }
	);

	return state;
}
