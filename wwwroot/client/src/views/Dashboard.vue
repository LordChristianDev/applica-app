<template>
  <div class="h-full flex flex-col">
    <header class="bg-white border-b border-gray-200 px-8 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-sm text-gray-600 mt-1">Manage your job applications</p>
        </div>
        <button @click="openModal()" class="btn btn-primary flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Application</span>
        </button>
      </div>

      <div class="grid grid-cols-4 gap-4 mt-6">
        <div v-for="(count, status) in statusCounts" :key="status" class="card p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">{{ status }}</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ count }}</p>
            </div>
            <div :class="getStatusIconClass(status)" class="w-12 h-12 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex-1 overflow-x-auto px-8 py-6">
      <div v-if="totalApplications > 0" class="grid grid-cols-4 gap-6 min-w-max">
        <KanbanColumn
          v-for="status in statuses"
          :key="status"
          :title="status"
          :status="status"
          :applications="getApplicationsByStatus(status)"
          @edit="openModal"
          @status-change="handleStatusChange"
        />
      </div>

      <div v-else class="flex items-center justify-center h-full">
        <div class="text-center max-w-md">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
          <p class="text-gray-600 mb-6">Start tracking your job applications by adding your first one!</p>
          <button @click="openModal()" class="btn btn-primary">
            Add Your First Application
          </button>
        </div>
      </div>
    </div>

    <ApplicationModal
      v-model="showModal"
      :application="selectedApplication"
      @save="handleSave"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useApplications } from '@/composables/useApplications'
import KanbanColumn from '@/components/KanbanColumn.vue'
import ApplicationModal from '@/components/ApplicationModal.vue'

const { 
  applications,
  statusCounts,
  totalApplications,
  addApplication,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
  getApplicationsByStatus
} = useApplications()

const statuses = ['Applied', 'Interview', 'Offer', 'Rejected']
const showModal = ref(false)
const selectedApplication = ref(null)

const openModal = (application = null) => {
  selectedApplication.value = application
  showModal.value = true
}

const handleSave = (formData) => {
  if (selectedApplication.value) {
    updateApplication(selectedApplication.value.id, formData)
  } else {
    addApplication(formData)
  }
}

const handleDelete = (id) => {
  deleteApplication(id)
}

const handleStatusChange = (applicationId, newStatus) => {
  updateApplicationStatus(applicationId, newStatus)
}

const getStatusIconClass = (status) => {
  const classes = {
    Applied: 'bg-blue-500',
    Interview: 'bg-yellow-500',
    Offer: 'bg-green-500',
    Rejected: 'bg-red-500'
  }
  return classes[status] || 'bg-gray-500'
}
</script>