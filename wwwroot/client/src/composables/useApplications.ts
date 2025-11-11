import { computed } from 'vue';
import { useApplicationsStore } from '@/composables/useApplicationsStore';
import type {
	ApplicationProp, ApplicationFormProp
} from '@/stores/types/types';

export function useApplications() {
	const store = useApplicationsStore();

	const applications = computed(() => store.applications);

	const statusCounts = computed(() => store.statusCounts);
	const totalApplications = computed(() => store.totalApplications);

	const setApplications = (applications: ApplicationProp[]) => store.setApplications(applications);

	const addApplication = (userId: number, application: ApplicationFormProp) => store.addApplication(userId, application);

	const updateApplication = (id: number, userId: number, updates: ApplicationFormProp) => store.updateApplication(id, userId, updates);

	const deleteApplication = (id: number) => store.deleteApplication(id);

	const updateApplicationStatus = (application: ApplicationProp, newStatus: "Applied" | "Interview" | "Offer" | "Rejected") => store.updateApplicationStatus(application, newStatus);

	const getApplicationsByStatus = (status: string) => store.getApplicationsByStatus(status);

	const exportToCSV = () => store.exportToCSV();

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
};