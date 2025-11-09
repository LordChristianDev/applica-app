import { BASE_URL } from "@/main";
import { tryCatch, type Result } from "@/lib/tryCatch";
import type { ApplicationProp } from "@/stores/types/types";

/**
 * Controllers
 */

export const CONTROLLERS = {};

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
	create: async (args: object): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				const response = await fetch(BASE_URL + `/applications/create`, {
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

				// Failed to Create Application
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
				const response = await fetch(BASE_URL + `/applications/update/${id}`, {
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

export const mockApplications: ApplicationProp[] = [
	{
		Id: 1,
		UserId: 1,
		Company: 'Google',
		Position: 'Senior Frontend Developer',
		DateApplied: '2024-10-15',
		Status: 'Interview',
		Notes: 'Technical interview scheduled for next week. Focus on system design and React patterns.',
		CreatedAt: "2025-10-28 14:59:22.535594",
		UpdatedAt: "2025-10-28 14:59:22.535594",
	},
	{
		Id: 2,
		UserId: 1,
		Company: 'Microsoft',
		Position: 'Full Stack Engineer',
		DateApplied: '2024-10-20',
		Status: 'Applied',
		Notes: 'Applied through LinkedIn. Referral from John at the company.',
		CreatedAt: "2025-10-28 14:59:22.535594",
		UpdatedAt: "2025-10-28 14:59:22.535594",
	},
	{
		Id: 3,
		UserId: 1,
		Company: 'Meta',
		Position: 'Software Engineer',
		DateApplied: '2024-10-05',
		Status: 'Offer',
		Notes: 'Offer received! Negotiating salary and benefits package.',
		CreatedAt: "2025-10-28 14:59:22.535594",
		UpdatedAt: "2025-10-28 14:59:22.535594",
	},
	{
		Id: 4,
		UserId: 1,
		Company: 'Amazon',
		Position: 'Frontend Engineer',
		DateApplied: '2024-09-28',
		Status: 'Rejected',
		Notes: 'Did not move forward after initial screening. Good learning experience.',
		CreatedAt: "2025-10-28 14:59:22.535594",
		UpdatedAt: "2025-10-28 14:59:22.535594",
	},
	{
		Id: 5,
		UserId: 1,
		Company: 'Apple',
		Position: 'UI Engineer',
		DateApplied: '2024-10-25',
		Status: 'Applied',
		Notes: 'Applied for UI team. Waiting to hear back.',
		CreatedAt: "2025-10-28 14:59:22.535594",
		UpdatedAt: "2025-10-28 14:59:22.535594",
	},
	{
		Id: 6,
		UserId: 1,
		Company: 'Netflix',
		Position: 'Senior Software Engineer',
		DateApplied: '2024-10-12',
		Status: 'Interview',
		Notes: 'Second round completed. Waiting for hiring manager decision.',
		CreatedAt: "2025-10-28 14:59:22.535594",
		UpdatedAt: "2025-10-28 14:59:22.535594",
	},
	{
		Id: 7,
		UserId: 1,
		Company: 'Airbnb',
		Position: 'Frontend Developer',
		DateApplied: '2024-10-18',
		Status: 'Applied',
		Notes: 'Strong interest in their design system work.',
		CreatedAt: "2025-10-28 14:59:22.535594",
		UpdatedAt: "2025-10-28 14:59:22.535594",
	},
	{
		Id: 8,
		UserId: 1,
		Company: 'Stripe',
		Position: 'Product Engineer',
		DateApplied: '2024-09-15',
		Status: 'Rejected',
		Notes: 'Team decided to go with more senior candidate.',
		CreatedAt: "2025-10-28 14:59:22.535594",
		UpdatedAt: "2025-10-28 14:59:22.535594",
	}
];