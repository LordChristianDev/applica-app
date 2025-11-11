import { BASE_URL } from "@/main";
import { tryCatch, type Result } from "@/lib/tryCatch";
import type { UserProp } from "@/stores/types/types";

/**
 * Controllers
 */

export const CONTROLLER = {
	/**
	 * Setup New User
	 * @param uid 
	 * @returns UserProp
	 */
	SetupNewUser: async (uid: string): Promise<UserProp> => {
		if (!uid) throw new Error("No Unique Identifier");

		const [user, userError] = await QUERIES.fetchUserByUid(uid);

		if (userError) throw new Error('Error checking existing user:', userError);

		// User Already Exits
		if (user) return user;

		// Create New User
		const [create, createError] = await MUTATIONS.create(uid);

		// Check if There is Error when creating new user
		if (!create || createError) throw new Error("Failed to create user");

		const [newUser, newError] = await QUERIES.fetchUserByUid(uid);

		// Check if There is Error when fetching new user
		if (!newUser || newError) throw new Error("Failed to fetch user");

		return newUser;
	},
	/**
	 * Fetch User By UID
	 * @param uid 
	 * @returns UserProp | null
	 */
	FetchUserByUID: async (uid: string): Promise<UserProp | null> => {
		if (!uid) throw new Error("No Unique Identifier Found");

		const [data, error] = await QUERIES.fetchUserByUid(uid);

		if (error) throw new Error('Error fetching user:', error);

		return data;
	},
};

/**
 * Queries
 */

export const QUERIES = {
	fetchAllUsers: async (): Promise<Result<UserProp[]>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/users/fetch-all`, {
					method: "GET",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: UserProp[] = [];

				if (data && data.length > 0) result = data;

				return result;
			})()
		);
	},
	fetchSomeUsers: async (
		page: number,
		limit: number
	): Promise<Result<UserProp[]>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/users/fetch-some`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						page,
						limit
					}),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: UserProp[] = [];

				if (data && data.length > 0) result = data;

				return result;
			})()
		);
	},
	fetchUserById: async (id: number): Promise<Result<UserProp | null>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/users/fetch-by-id/${id}`, {
					method: "GET",
				});

				if (response.status === 404) return null;

				const data = await response.json();

				if (!response.ok) throw new Error(data.error || "Something went wrong!");

				return data as UserProp;
			})()
		);
	},
	fetchUserByUid: async (uid: string): Promise<Result<UserProp | null>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/users/fetch-by-uid/${uid}`, {
					method: "GET",
				});

				if (response.status === 404) return null;

				const data = await response.json();

				if (!response.ok) throw new Error(data.error || "Something went wrong!");

				return data as UserProp;
			})()
		);
	},
};

/**
 * Mutations
 */

export const MUTATIONS = {
	create: async (uid: string): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/users/create`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						Uid: uid,
						CreatedAt: new Date().toISOString(),
						LastLogin: new Date().toISOString(),
					}),
				});
				const data = await response.json();

				if (!response.ok) throw new Error(data.error || "Something went wrong!");

				// Failed to Create User
				if (!data) return false;

				return true;
			})()
		);
	},
	update: async (
		id: number,
		updates: object
	): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/users/update/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						updates,
					}),
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				// Failed to Update User
				if (!data) return false;

				return true;
			})()
		);
	},
	delete: async (id: number): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/users/delete/${id}`, {
					method: "DELETE",
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				// Failed to Delete User
				if (!data) return false;

				return true;
			})()
		);
	},
};

export const mockUser: UserProp = {
	Id: 1,
	Uid: "0asf0s7gs89f7d",
	CreatedAt: "2025-10-28 14:59:22.535594",
	LastLogin: "2025-10-28 14:59:22.535594",
};