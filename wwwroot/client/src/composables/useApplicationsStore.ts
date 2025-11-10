import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import type { ApplicationProp } from '@/stores/types/types';
import { mockApplications } from '@/stores/services/application-services';

export const useApplicationsStore = defineStore('applications', () => {
	const applications = ref<ApplicationProp[]>([]);
	const isInitialized = ref(false);

	const loadFromStorage = () => {
		applications.value = [...mockApplications];
		isInitialized.value = true;
	}

	const addApplication = (application: Partial<ApplicationProp>) => {
		const newApplication: Partial<ApplicationProp> = {
			...application,
			DateApplied: application.DateApplied || new Date().toISOString().split('T')[0]
		}
		applications.value.push(newApplication as ApplicationProp);
		return newApplication;
	};

	const updateApplication = (id: number, updates: Partial<ApplicationProp>) => {
		const index = applications.value.findIndex(app => app.Id === id);
		if (index !== -1) {
			applications.value[index] = { ...applications.value[index], ...updates };
			return applications.value[index];
		}
		return null;
	};

	const deleteApplication = (id: number) => {
		const index = applications.value.findIndex(app => app.Id === id)
		if (index !== -1) {
			applications.value.splice(index, 1)
			return true
		}
		return false;
	};

	const updateApplicationStatus = (id: number, newStatus: "Applied" | "Interview" | "Offer" | "Rejected") => {
		return updateApplication(id, { Status: newStatus })
	};

	const getApplicationsByStatus = (status: string) => {
		return applications.value.filter((app: ApplicationProp) => app.Status === status);
	};

	const statusCounts = computed(() => {
		return {
			Applied: applications.value.filter((app: ApplicationProp) => app.Status === 'Applied').length,
			Interview: applications.value.filter((app: ApplicationProp) => app.Status === 'Interview').length,
			Offer: applications.value.filter((app: ApplicationProp) => app.Status === 'Offer').length,
			Rejected: applications.value.filter((app: ApplicationProp) => app.Status === 'Rejected').length
		}
	});

	const totalApplications = computed(() => applications.value.length);

	const exportToCSV = () => {
		const headers = ['Company', 'Position', 'Date Applied', 'Status', 'Notes'];
		const rows = applications.value.map((app: Partial<ApplicationProp>) => [
			app.Company,
			app.Position,
			app.DateApplied,
			app.Status,
			app.Notes || ''
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