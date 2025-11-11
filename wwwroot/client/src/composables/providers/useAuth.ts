import { provide, inject } from 'vue';
import { usePersistedRef } from '@/composables/usePersistedRef';
import { getItem, removeItem } from '@/lib/localStorage';

import type { Ref } from 'vue';
import type { UserProp } from '@/stores/types/types';


const AUTH_KEY = Symbol('auth');

export type AuthContextType = {
	currentUser: Ref<UserProp>;
	storeUser: (data: UserProp) => void;
	signOut: () => Promise<boolean>;
};

// Helper to get local user
const getLocalUser = (): UserProp => {
	const data = getItem('currentUser');
	return data || {} as UserProp;
};

export function useAuthHook(): AuthContextType {
	const currentUser = usePersistedRef<UserProp>(
		'currentUser',
		getLocalUser()
	);

	const storeUser = (data: UserProp) => {
		if (!data) throw new Error('Data for user storage is empty');
		currentUser.value = data;
	};

	const signOut = async (): Promise<boolean> => {
		removeItem('currentUser');
		currentUser.value = {} as UserProp;
		return true;
	};

	return { currentUser, storeUser, signOut };
}

// Provide the auth context to child components
export function provideAuth() {
	const authData = useAuthHook();
	provide(AUTH_KEY, authData);
	return authData;
}

// Inject the auth context in any child component
export function useAuth(): AuthContextType {
	const context = inject<AuthContextType>(AUTH_KEY);
	if (!context) throw new Error('useAuth must be used within an auth provider');
	return context;
}
