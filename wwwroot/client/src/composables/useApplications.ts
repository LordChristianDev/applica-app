import { computed } from 'vue';
import { useApplicationsStore } from '@/composables/useApplicationsStore';

export function useApplications() {
	const store = useApplicationsStore();

	const applications = computed(() => store.applications);
	const statusCounts = computed(() => store.statusCounts);
	const totalApplications = computed(() => store.totalApplications);

	const addApplication = (application: any) => store.addApplication(application);

	const updateApplication = (id: number, updates: any) => store.updateApplication(id, updates);

	const deleteApplication = (id: number) => store.deleteApplication(id);

	const updateApplicationStatus = (id: number, newStatus: "Applied" | "Interview" | "Offer" | "Rejected") => store.updateApplicationStatus(id, newStatus);

	const getApplicationsByStatus = (status: string) => store.getApplicationsByStatus(status);

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