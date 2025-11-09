import { BASE_URL } from "@/main";
import { tryCatch, type Result } from "@/lib/tryCatch";
import type { ProfileProp } from "@/stores/types/types";

/**
 * Controllers
 */

export const CONTROLLERS = {};

/**
 * Queries
 */

export const QUERIES = {
	fetchAllProfiles: async (): Promise<Result<ProfileProp[]>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/profiles/fetch-all`, {
					method: "GET",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: ProfileProp[] = [];

				if (data && data.length > 0) result = data;

				return result;
			})()
		);
	},
	fetchSomeProfiles: async (
		page: number,
		limit: number
	): Promise<Result<ProfileProp[]>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/profiles/fetch-some`, {
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

				let result: ProfileProp[] = [];

				if (data && data.length > 0) result = data;

				return result;
			})()
		);
	},
	fetchProfileById: async (id: number): Promise<Result<ProfileProp | null>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/profiles/fetch-by-id/${id}`, {
					method: "GET",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: ProfileProp | null = null;

				if (data) result = data;

				return result;
			})()
		);
	},
	fetchProfileByUserId: async (userId: number): Promise<Result<ProfileProp | null>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/profiles/fetch-by-user-id/${userId}`, {
					method: "GET",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: ProfileProp | null = null;

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
				const response = await fetch(BASE_URL + `/profiles/create`, {
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

				// Failed to Create Profile
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
				const response = await fetch(BASE_URL + `/profiles/update/${id}`, {
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

				// Failed to Update Profile
				if (!data) return false;

				return true;
			})()
		);
	},
	delete: async (id: number): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/profiles/delete/${id}`, {
					method: "DELETE",
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				// Failed to Delete Profile
				if (!data) return false;

				return true;
			})()
		);
	},
};