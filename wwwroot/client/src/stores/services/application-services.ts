import { BASE_URL } from "@/main";
import { tryCatch, type Result } from "@/lib/tryCatch";
import type { ApplicationFormProp, ApplicationProp } from "@/stores/types/types";

/**
 * Controllers
 */

export const CONTROLLERS = {
	/**
	 * Create New Application
	 * @param userId 
	 * @param args 
	 * @returns boolean
	 */
	CreateNewApplication: async (
		userId: number,
		args: ApplicationFormProp
	): Promise<Boolean> => {
		if (!userId) throw new Error("No Unique Identifier");

		const [data, error] = await MUTATIONS.create(userId, args);

		if (error) throw new Error("Failed to create application");
		if (!data) return false;

		return true;
	},
	/**
	 * Fetch All User Applications
	 * @param userId 
	 * @returns ApplicationProp[]
	 */
	FetchAllUserApplications: async (userId: number): Promise<ApplicationProp[]> => {
		if (!userId) throw new Error("No Unique Identifier");

		const [data, error] = await QUERIES.fetchAllApplicationsWithUserId(userId);

		if (error) throw new Error("Failed to create application");
		if (!data) return [];

		return data as ApplicationProp[];
	},
	/**
	 * Update Application
	 * @param id 
	 * @param updates 
	 * @returns boolean
	 */
	UpdateApplication: async (
		id: number,
		userId: number,
		updates: ApplicationFormProp
	): Promise<boolean> => {
		if (!id) throw new Error("No Unique Identifier");

		const [data, error] = await MUTATIONS.update(id, userId, updates);

		if (error) throw new Error("Failed to update application");
		if (!data) return false;

		return true;
	},
	/**
	 * Delete Application
	 * @param id 
	 * @returns boolean
	 */
	DeleteApplication: async (id: number): Promise<boolean> => {
		if (!id) throw new Error("No Unique Identifier");

		const [data, error] = await MUTATIONS.delete(id);

		if (error) throw new Error("Failed to delete application");
		if (!data) return false;

		return true;
	},
};

/**
 * Queries
 */

export const QUERIES = {
	fetchAllApplications: async (): Promise<Result<ApplicationProp[]>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/applications/fetch-all`, {
					method: "GET",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: ApplicationProp[] = [];

				if (data && data.length > 0) result = data;

				return result;
			})()
		);
	},
	fetchSomeApplications: async (
		page: number,
		limit: number
	): Promise<Result<ApplicationProp[]>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/applications/fetch-some`, {
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

				let result: ApplicationProp[] = [];

				if (data && data.length > 0) result = data;

				return result;
			})()
		);
	},
	fetchAllApplicationsWithUserId: async (userId: number): Promise<Result<ApplicationProp[]>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/applications/fetch-all-user-id/${userId}`, {
					method: "GET",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: ApplicationProp[] = [];

				if (data && data.length > 0) result = data;

				return result;
			})()
		);
	},
	fetchSomeApplicationsWithUserId: async (
		userId: number,
		page: number,
		limit: number
	): Promise<Result<ApplicationProp[]>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/applications/fetch-some-user-id/${userId}`, {
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

				let result: ApplicationProp[] = [];

				if (data && data.length > 0) result = data;

				return result;
			})()
		);
	},
	fetchApplicationById: async (id: number): Promise<Result<ApplicationProp | null>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/applications/fetch-by-id/${id}`, {
					method: "GET",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				let result: ApplicationProp | null = null;

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
	create: async (
		userId: number,
		args: ApplicationFormProp
	): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/applications/create`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						UserId: userId,
						Company: args.company,
						Position: args.position,
						DateApplied: args.dateApplied,
						Status: args.status,
						Notes: args.notes ?? null,
					}),
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				// Failed to Create Application
				if (!data) return false;

				return true;
			})()
		);
	},
	update: async (
		id: number,
		userId: number,
		updates: ApplicationFormProp
	): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/applications/update/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						Id: id,
						UserId: userId,
						Company: updates.company,
						Position: updates.position,
						DateApplied: updates.dateApplied,
						Status: updates.status,
						Notes: updates.notes ?? null,
					}),
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				// Failed to Update Application
				if (!data) return false;

				return true;
			})()
		);
	},
	delete: async (id: number): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/applications/delete/${id}`, {
					method: "DELETE",
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				// Failed to Delete Application
				if (!data) return false;

				return true;
			})()
		);
	},
};