<template>
  <div class="h-full overflow-y-auto">
    <header class="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Reports</h1>
          <p class="text-sm text-gray-600 mt-1">Visualize your application progress</p>
        </div>
        <button @click="exportToCSV" class="btn btn-primary flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export CSV</span>
        </button>
      </div>
    </header>

    <div class="px-8 py-6 space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Applications by Status</h2>
          <div class="h-64">
            <Doughnut :data="doughnutData" :options="chartOptions" />
          </div>
        </div>

        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Status Overview</h2>
          <div class="h-64">
            <Bar :data="barData" :options="chartOptions" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Summary Statistics</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600">{{ totalApplications }}</div>
            <div class="text-sm text-gray-600 mt-1">Total Applications</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-yellow-600">{{ statusCounts.Interview }}</div>
            <div class="text-sm text-gray-600 mt-1">In Interview</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">{{ statusCounts.Offer }}</div>
            <div class="text-sm text-gray-600 mt-1">Offers Received</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ successRate }}%</div>
            <div class="text-sm text-gray-600 mt-1">Response Rate</div>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="app in recentApplications" :key="app.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ app.company }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ app.position }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ formatDate(app.dateApplied) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(app.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ app.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut, Bar } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { format } from 'date-fns'
import { useApplications } from '../composables/useApplications'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const { applications, statusCounts, totalApplications, exportToCSV } = useApplications()

const doughnutData = computed(() => ({
  labels: ['Applied', 'Interview', 'Offer', 'Rejected'],
  datasets: [
    {
      data: [
        statusCounts.value.Applied,
        statusCounts.value.Interview,
        statusCounts.value.Offer,
        statusCounts.value.Rejected
      ],
      backgroundColor: ['#3b82f6', '#eab308', '#22c55e', '#ef4444'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }
  ]
}))

const barData = computed(() => ({
  labels: ['Applied', 'Interview', 'Offer', 'Rejected'],
  datasets: [
    {
      label: 'Number of Applications',
      data: [
        statusCounts.value.Applied,
        statusCounts.value.Interview,
        statusCounts.value.Offer,
        statusCounts.value.Rejected
      ],
      backgroundColor: ['#3b82f6', '#eab308', '#22c55e', '#ef4444']
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

const successRate = computed(() => {
  const total = totalApplications.value
  if (total === 0) return 0
  const responded = statusCounts.value.Interview + statusCounts.value.Offer
  return Math.round((responded / total) * 100)
})

const recentApplications = computed(() => {
  return [...applications.value]
    .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
    .slice(0, 10)
})

const formatDate = (date) => {
  try {
    return format(new Date(date), 'MMM d, yyyy')
  } catch {
    return date
  }
}

const getStatusClass = (status) => {
  const classes = {
    Applied: 'bg-blue-100 text-blue-700',
    Interview: 'bg-yellow-100 text-yellow-700',
    Offer: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}
</script>