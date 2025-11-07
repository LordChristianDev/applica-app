import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { demoData } from '@/stores/applications';

export const useApplicationsStore = defineStore('applications', () => {
	const applications = ref([]);
	const isInitialized = ref(false);

	const loadFromStorage = () => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				applications.value = JSON.parse(stored);
				isInitialized.value = true;
			} else {
				applications.value = [...demoData];
				saveToStorage();
				isInitialized.value = true;
			}
		} catch (error) {
			console.error('Error loading applications:', error);
			applications.value = [...demoData];
			isInitialized.value = true;
		}
	}

	const saveToStorage = () => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(applications.value));
		} catch (error) {
			console.error('Error saving applications:', error);
		}
	};

	const addApplication = (application) => {
		const newApplication = {
			...application,
			id: Date.now().toString(),
			dateApplied: application.dateApplied || new Date().toISOString().split('T')[0]
		}
		applications.value.push(newApplication);
		saveToStorage();
		return newApplication;
	};

	const updateApplication = (id, updates) => {
		const index = applications.value.findIndex(app => app.id === id);
		if (index !== -1) {
			applications.value[index] = { ...applications.value[index], ...updates };
			saveToStorage();
			return applications.value[index];
		}
		return null;
	};

	const deleteApplication = (id) => {
		const index = applications.value.findIndex(app => app.id === id)
		if (index !== -1) {
			applications.value.splice(index, 1)
			saveToStorage()
			return true
		}
		return false;
	};

	const updateApplicationStatus = (id, newStatus) => {
		return updateApplication(id, { status: newStatus })
	};

	const getApplicationsByStatus = (status) => {
		return applications.value.filter(app => app.status === status)
	};

	const statusCounts = computed(() => {
		return {
			Applied: applications.value.filter(app => app.status === 'Applied').length,
			Interview: applications.value.filter(app => app.status === 'Interview').length,
			Offer: applications.value.filter(app => app.status === 'Offer').length,
			Rejected: applications.value.filter(app => app.status === 'Rejected').length
		}
	});

	const totalApplications = computed(() => applications.value.length);

	const exportToCSV = () => {
		const headers = ['Company', 'Position', 'Date Applied', 'Status', 'Notes'];
		const rows = applications.value.map(app => [
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