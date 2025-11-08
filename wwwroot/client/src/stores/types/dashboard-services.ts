import { tryCatch, type Result } from "@/lib/tryCatch";
import type { ApplicationProp } from "../services/dashboard-types";

/**
 * 
 */

export const CONTROLLERS = {};

/**
 * Queries
 */

export const QUERIES = {
	fetchApplications: async (): Promise<Result<ApplicationProp[]>> => {
		return tryCatch(
			(async () => {
				await new Promise(resolve => setTimeout(resolve, 1000));

				let result: ApplicationProp[] = mockApplications;

				return result;
			})()
		);
	},
	fetchApplicationByStatus: async (status: string): Promise<Result<ApplicationProp[]>> => {
		return tryCatch(
			(async () => {
				await new Promise(resolve => setTimeout(resolve, 1000));

				let result: ApplicationProp[] = mockApplications.filter(app => app.status === status);

				return result;
			})()
		);
	}
};

/**
 * Mutations
 */

export const MUTATIONS = {
	createApplication: async (args: object): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				if (!args) throw new Error("No arguments provided");

				return true;
			})()
		);
	},
	updateApplication: async (updates: object): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				if (!updates) throw new Error("No arguments provided");

				return true;
			})()
		);
	},
	deleteApplication: async (id: number): Promise<Result<boolean>> => {
		return tryCatch(
			(async () => {
				if (!id) throw new Error("No arguments provided");

				return true;
			})()
		);
	}
};

export const mockApplications: ApplicationProp[] = [
	{
		id: 1,
		created_at: "2025-10-28 14:59:22.535594",
		updated_at: "2025-10-28 14:59:22.535594",
		company: 'Google',
		position: 'Senior Frontend Developer',
		date_applied: '2024-10-15',
		status: 'Interview',
		notes: 'Technical interview scheduled for next week. Focus on system design and React patterns.'
	},
	{
		id: 2,
		created_at: "2025-10-28 14:59:22.535594",
		updated_at: "2025-10-28 14:59:22.535594",
		company: 'Microsoft',
		position: 'Full Stack Engineer',
		date_applied: '2024-10-20',
		status: 'Applied',
		notes: 'Applied through LinkedIn. Referral from John at the company.'
	},
	{
		id: 3,
		created_at: "2025-10-28 14:59:22.535594",
		updated_at: "2025-10-28 14:59:22.535594",
		company: 'Meta',
		position: 'Software Engineer',
		date_applied: '2024-10-05',
		status: 'Offer',
		notes: 'Offer received! Negotiating salary and benefits package.'
	},
	{
		id: 4,
		created_at: "2025-10-28 14:59:22.535594",
		updated_at: "2025-10-28 14:59:22.535594",
		company: 'Amazon',
		position: 'Frontend Engineer',
		date_applied: '2024-09-28',
		status: 'Rejected',
		notes: 'Did not move forward after initial screening. Good learning experience.'
	},
	{
		id: 5,
		created_at: "2025-10-28 14:59:22.535594",
		updated_at: "2025-10-28 14:59:22.535594",
		company: 'Apple',
		position: 'UI Engineer',
		date_applied: '2024-10-25',
		status: 'Applied',
		notes: 'Applied for UI team. Waiting to hear back.'
	},
	{
		id: 6,
		created_at: "2025-10-28 14:59:22.535594",
		updated_at: "2025-10-28 14:59:22.535594",
		company: 'Netflix',
		position: 'Senior Software Engineer',
		date_applied: '2024-10-12',
		status: 'Interview',
		notes: 'Second round completed. Waiting for hiring manager decision.'
	},
	{
		id: 7,
		created_at: "2025-10-28 14:59:22.535594",
		updated_at: "2025-10-28 14:59:22.535594",
		company: 'Airbnb',
		position: 'Frontend Developer',
		date_applied: '2024-10-18',
		status: 'Applied',
		notes: 'Strong interest in their design system work.'
	},
	{
		id: 8,
		created_at: "2025-10-28 14:59:22.535594",
		updated_at: "2025-10-28 14:59:22.535594",
		company: 'Stripe',
		position: 'Product Engineer',
		date_applied: '2024-09-15',
		status: 'Rejected',
		notes: 'Team decided to go with more senior candidate.'
	}
];