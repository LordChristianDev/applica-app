import { computed } from 'vue';
import { useApplicationsStore } from '@/composables/useApplicationsStore';

export function useApplications() {
	const store = useApplicationsStore();

	const applications = computed(() => store.applications);
	const statusCounts = computed(() => store.statusCounts);
	const totalApplications = computed(() => store.totalApplications);

	const addApplication = (application) => store.addApplication(application);

	const updateApplication = (id, updates) => store.updateApplication(id, updates);

	const deleteApplication = (id) => store.deleteApplication(id);

	const updateApplicationStatus = (id, newStatus) => store.updateApplicationStatus(id, newStatus);

	const getApplicationsByStatus = (status) => store.getApplicationsByStatus(status);

	const exportToCSV = () => store.exportToCSV();

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
};