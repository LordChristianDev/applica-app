import { BASE_URL } from "@/main";
import { tryCatch, type Result } from "@/lib/tryCatch";
import type { UserProp } from "@/stores/types/types";

/**
 * Controllers
 */

export const CONTROLLERS = {};

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

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: UserProp | null = null;

				if (data) result = data;

				return result;
			})()
		);
	},
	fetchUserByUid: async (uid: string): Promise<Result<UserProp | null>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/users/fetch-by-uid/${uid}`, {
					method: "GET",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: UserProp | null = null;

				if (data) result = data;

				return result;
			})()
		);
	},
};

/**
 * Mutations
 */

export const MUTATIONS = {
	create: async (args: object): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/users/create`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						args,
					}),
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

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