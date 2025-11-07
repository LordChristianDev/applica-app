<template>
  <div class="h-full overflow-y-auto">
    <header class="bg-white border-b border-gray-200 px-8 py-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
        <p class="text-sm text-gray-600 mt-1">Manage your preferences and data</p>
      </div>
    </header>

    <div class="px-8 py-6 max-w-3xl">
      <div class="space-y-6">
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Data Management</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-2">Storage Information</h3>
              <p class="text-sm text-gray-600">
                Your application data is stored locally in your browser using LocalStorage.
                This means your data stays on your device and is not sent to any server.
              </p>
            </div>

            <div class="flex items-center justify-between py-4 border-t border-gray-200">
              <div>
                <h3 class="text-sm font-medium text-gray-900">Total Applications</h3>
                <p class="text-sm text-gray-600">{{ totalApplications }} applications tracked</p>
              </div>
              <button @click="handleExport" class="btn btn-secondary">
                Export Data
              </button>
            </div>

            <div class="flex items-center justify-between py-4 border-t border-gray-200">
              <div>
                <h3 class="text-sm font-medium text-gray-900">Clear All Data</h3>
                <p class="text-sm text-gray-600">Delete all applications permanently</p>
              </div>
              <button @click="handleClearData" class="btn bg-red-100 text-red-700 hover:bg-red-200">
                Clear Data
              </button>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">About JobTrackr</h2>
          <div class="space-y-3 text-sm text-gray-600">
            <p>
              <strong class="text-gray-900">Version:</strong> 1.0.0
            </p>
            <p>
              JobTrackr is a modern job application tracker built with Vue 3, designed to help you
              organize and visualize your job search journey. Track applications across different stages,
              view insightful analytics, and export your data anytime.
            </p>
            <div class="pt-4">
              <h3 class="text-sm font-medium text-gray-900 mb-2">Tech Stack</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">Vue 3</span>
                <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">Pinia</span>
                <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">Vue Router</span>
                <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">Tailwind CSS</span>
                <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">Chart.js</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Future Enhancements</h2>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Backend integration with .NET API
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              User authentication and cloud sync
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Email reminders and deadline tracking
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Advanced search and filtering
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApplications } from '../composables/useApplications'

const { totalApplications, exportToCSV } = useApplications()

const handleExport = () => {
  exportToCSV()
}

const handleClearData = () => {
  if (confirm('Are you sure you want to delete all applications? This action cannot be undone.')) {
    localStorage.removeItem('jobtrackr_applications')
    window.location.reload()
  }
}
</script>