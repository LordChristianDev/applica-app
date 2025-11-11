import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

import type { ApplicationFormProp, ApplicationProp } from '@/stores/types/types';
import { CONTROLLERS as APPLICATIONS_CONTROLLER } from '@/stores/services/application-services';

export const useApplicationsStore = defineStore('applications', () => {
	const applications = ref<ApplicationProp[]>([]);
	const queryClient = useQueryClient();

	const setApplications = (setApplications: ApplicationProp[]) => {
		applications.value = [...setApplications];
	};

	const addApplication = (userId: number, args: ApplicationFormProp) => {
		const newApplication: ApplicationProp = {
			id: Math.floor(Math.random() * 901) + 100,
			userId: userId,
			company: args.company,
			position: args.position,
			dateApplied: args.dateApplied || new Date().toISOString().split('T')[0],
			status: args.status,
			notes: args.notes,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		applications.value.push(newApplication);

		APPLICATIONS_CONTROLLER.CreateNewApplication(userId, args);
		queryClient.invalidateQueries({ queryKey: ['applications', userId] });
		return newApplication;
	};

	const updateApplication = (id: number, userId: number, updates: ApplicationFormProp) => {
		const index = applications.value.findIndex(app => app.id === id);
		if (index !== -1) {
			applications.value[index] = { ...applications.value[index], ...updates };

			APPLICATIONS_CONTROLLER.UpdateApplication(id, userId, updates);
			queryClient.invalidateQueries({ queryKey: ['applications'] });
			return applications.value[index];
		}
		return null;
	};

	const deleteApplication = (id: number) => {
		const index = applications.value.findIndex(app => app.id === id);
		if (index !== -1) {
			applications.value.splice(index, 1);

			APPLICATIONS_CONTROLLER.DeleteApplication(id);
			queryClient.invalidateQueries({ queryKey: ['applications'] });
			return true
		}
		return false;
	};

	const updateApplicationStatus = (application: ApplicationProp, newStatus: "Applied" | "Interview" | "Offer" | "Rejected") => {
		return updateApplication(application.id, application.userId, {
			company: application.company,
			position: application.position,
			dateApplied: application.dateApplied,
			status: newStatus,
			notes: application.notes,
		})
	};

	const getApplicationsByStatus = (status: string) => {
		return applications.value.filter((app: ApplicationProp) => app.status === status);
	};

	const statusCounts = computed(() => {
		return {
			Applied: applications.value.filter((app: ApplicationProp) => app.status === 'Applied').length,
			Interview: applications.value.filter((app: ApplicationProp) => app.status === 'Interview').length,
			Offer: applications.value.filter((app: ApplicationProp) => app.status === 'Offer').length,
			Rejected: applications.value.filter((app: ApplicationProp) => app.status === 'Rejected').length
		}
	});

	const totalApplications = computed(() => applications.value.length);

	const exportToCSV = () => {
		const headers = ['Company', 'Position', 'Date Applied', 'Status', 'Notes'];
		const rows = applications.value.map((app: Partial<ApplicationProp>) => [
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

	return {
		applications,
		statusCounts,
		totalApplications,
		setApplications,
		addApplication,
		updateApplication,
		deleteApplication,
		updateApplicationStatus,
		getApplicationsByStatus,
		exportToCSV
	};
});