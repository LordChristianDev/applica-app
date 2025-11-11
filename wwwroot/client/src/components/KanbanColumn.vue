<template>
  <div class="flex flex-col bg-gray-100 rounded-lg p-4 min-h-[500px]">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <div :class="statusColorClass" class="w-3 h-3 rounded-full"></div>
        <h2 class="font-semibold text-gray-900">{{ title }}</h2>
        <span class="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
          {{ applications.length }}
        </span>
      </div>
    </div>

    <draggable
      :list="applications"
      :group="{ name: 'applications' }"
      item-key="id"
      class="flex-1 space-y-3 min-h-[200px]"
      ghost-class="opacity-50"
      chosen-class="bg-primary-100"
      @change="handleChange"
    >
      <template #item="{ element }">
        <JobCard :application="element" @edit="$emit('edit', element)" />
      </template>
    </draggable>

    <div v-if="applications.length === 0" class="flex-1 flex items-center justify-center">
      <div class="text-center text-gray-400">
        <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-sm">No applications</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import draggable from 'vuedraggable';

import JobCard from '@/components/JobCard.vue';

import type { ApplicationProp } from '@/stores/types/types';

const props = defineProps<{
  title: string
  status: string
  applications:  ApplicationProp[],
}>();

const emit = defineEmits(['edit', 'statusChange'])

const statusColorClass = computed(() => {
  const colors = {
    Applied: 'bg-blue-500',
    Interview: 'bg-yellow-500',
    Offer: 'bg-green-500',
    Rejected: 'bg-red-500'
  } as const
  
  return colors[props.status as keyof typeof colors] || 'bg-gray-500'
})

const handleChange = (event: any) => {
  if (event.added) {
    emit('statusChange', event.added.element, props.status)
  }
}
</script>