<template>
  <div class="card p-4 hover:shadow-md transition-shadow duration-200 cursor-move">
    <div class="flex items-start justify-between mb-2">
      <h3 class="font-semibold text-gray-900 text-sm">{{ application.company }}</h3>
      <button
        @click="$emit('edit', application)"
        class="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
    
    <p class="text-gray-600 text-sm mb-3">{{ application.position }}</p>
    
    <div class="flex items-center justify-between text-xs text-gray-500">
      <div class="flex items-center space-x-1">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{{ formattedDate }}</span>
      </div>
      
      <span :class="statusColor" class="px-2 py-0.5 rounded-full font-medium">
        {{ application.status }}
      </span>
    </div>
    
    <p v-if="application.notes" class="text-xs text-gray-500 mt-3 line-clamp-2">
      {{ application.notes }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'

const props = defineProps({
  application: {
    type: Object,
    required: true
  }
})

defineEmits(['edit'])

const formattedDate = computed(() => {
  try {
    return format(new Date(props.application.dateApplied), 'MMM d, yyyy')
  } catch {
    return props.application.dateApplied
  }
})

const statusColor = computed(() => {
  const colors = {
    Applied: 'bg-blue-100 text-blue-700',
    Interview: 'bg-yellow-100 text-yellow-700',
    Offer: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700'
  }
  return colors[props.application.status] || 'bg-gray-100 text-gray-700'
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>