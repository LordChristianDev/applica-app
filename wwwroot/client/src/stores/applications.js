import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const STORAGE_KEY = 'jobtrackr_applications'

export const demoData = [
	{
		id: '1',
		company: 'Google',
		position: 'Senior Frontend Developer',
		dateApplied: '2024-10-15',
		status: 'Interview',
		notes: 'Technical interview scheduled for next week. Focus on system design and React patterns.'
	},
	{
		id: '2',
		company: 'Microsoft',
		position: 'Full Stack Engineer',
		dateApplied: '2024-10-20',
		status: 'Applied',
		notes: 'Applied through LinkedIn. Referral from John at the company.'
	},
	{
		id: '3',
		company: 'Meta',
		position: 'Software Engineer',
		dateApplied: '2024-10-05',
		status: 'Offer',
		notes: 'Offer received! Negotiating salary and benefits package.'
	},
	{
		id: '4',
		company: 'Amazon',
		position: 'Frontend Engineer',
		dateApplied: '2024-09-28',
		status: 'Rejected',
		notes: 'Did not move forward after initial screening. Good learning experience.'
	},
	{
		id: '5',
		company: 'Apple',
		position: 'UI Engineer',
		dateApplied: '2024-10-25',
		status: 'Applied',
		notes: 'Applied for UI team. Waiting to hear back.'
	},
	{
		id: '6',
		company: 'Netflix',
		position: 'Senior Software Engineer',
		dateApplied: '2024-10-12',
		status: 'Interview',
		notes: 'Second round completed. Waiting for hiring manager decision.'
	},
	{
		id: '7',
		company: 'Airbnb',
		position: 'Frontend Developer',
		dateApplied: '2024-10-18',
		status: 'Applied',
		notes: 'Strong interest in their design system work.'
	},
	{
		id: '8',
		company: 'Stripe',
		position: 'Product Engineer',
		dateApplied: '2024-09-15',
		status: 'Rejected',
		notes: 'Team decided to go with more senior candidate.'
	}
];