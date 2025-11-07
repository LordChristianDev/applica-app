import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import type { ApplicationProp } from '@/stores/services/dashboard-types';
import { mockApplications } from '@/stores/types/dashboard-services';

export const useApplicationsStore = defineStore('applications', () => {
	const applications = ref<ApplicationProp[]>([]);
	const isInitialized = ref(false);

	const loadFromStorage = () => {
		applications.value = [...mockApplications];
		isInitialized.value = true;
	}

	const addApplication = (application: any) => {
		const newApplication: ApplicationProp = {
			...application,
			id: Date.now().toString(),
			date_applied: application.dateApplied || new Date().toISOString().split('T')[0]
		}
		applications.value.push(newApplication);
		return newApplication;
	};

	const updateApplication = (id: number, updates: Partial<ApplicationProp>) => {
		const index = applications.value.findIndex(app => app.id === id);
		if (index !== -1) {
			applications.value[index] = { ...applications.value[index], ...updates };
			return applications.value[index];
		}
		return null;
	};

	const deleteApplication = (id: number) => {
		const index = applications.value.findIndex(app => app.id === id)
		if (index !== -1) {
			applications.value.splice(index, 1)
			return true
		}
		return false;
	};

	const updateApplicationStatus = (id: number, newStatus: "Applied" | "Interview" | "Offer" | "Rejected") => {
		return updateApplication(id, { status: newStatus })
	};

	const getApplicationsByStatus = (status: string) => {
		return applications.value.filter((app: any) => app.status === status)
	};

	const statusCounts = computed(() => {
		return {
			Applied: applications.value.filter((app: any) => app.status === 'Applied').length,
			Interview: applications.value.filter((app: any) => app.status === 'Interview').length,
			Offer: applications.value.filter((app: any) => app.status === 'Offer').length,
			Rejected: applications.value.filter((app: any) => app.status === 'Rejected').length
		}
	});

	const totalApplications = computed(() => applications.value.length);

	const exportToCSV = () => {
		const headers = ['Company', 'Position', 'Date Applied', 'Status', 'Notes'];
		const rows = applications.value.map((app: any) => [
			app.company,
			app.position,
			app.dateApplied,
			app.status,
			app.notes || ''
		]);

		const csvContent = [
			headers.join(','),
			...rows.map(row => row.map(cell => `"${cell}"`).join(','))
		].join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);

		link.setAttribute('href', url);
		link.setAttribute('download', `jobtrackr_applications_${new Date().toISOString().split('T')[0]}.csv`);
		link.style.visibility = 'hidden';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	if (!isInitialized.value) {
		loadFromStorage();
	};

	return {
		applications,
		statusCounts,
		totalApplications,
		addApplication,
		updateApplication,
		deleteApplication,
		updateApplicationStatus,
		getApplicationsByStatus,
		exportToCSV
	};
});