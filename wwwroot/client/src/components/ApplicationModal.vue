<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
          <div class="fixed inset-0 transition-opacity bg-gray-800/50 bg-opacity-75" @click="close"></div>

          <div class="relative inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-gray-900">
                {{ isEditing ? 'Edit Application' : 'Add New Application' }}
              </h3>
              <button @click="close" class="text-gray-400 hover:text-gray-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label class="label">Company Name *</label>
                <input
                  v-model="formData.Company"
                  type="text"
                  required
                  class="input"
                  placeholder="e.g., Google"
                />
              </div>

              <div>
                <label class="label">Position *</label>
                <input
                  v-model="formData.Position"
                  type="text"
                  required
                  class="input"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>

              <div>
                <label class="label">Date Applied *</label>
                <input
                  v-model="formData.DateApplied"
                  type="date"
                  required
                  class="input"
                />
              </div>

              <div>
                <label class="label">Status *</label>
                <select v-model="formData.Status" required class="input">
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label class="label">Notes</label>
                <textarea
                  v-model="formData.Notes"
                  rows="4"
                  class="input"
                  placeholder="Add any additional notes or details about this application..."
                ></textarea>
              </div>

              <div class="flex items-center justify-between pt-4">
                <button
                  v-if="isEditing"
                  type="button"
                  @click="handleDelete"
                  class="btn text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
                <div class="flex space-x-3 ml-auto">
                  <button type="button" @click="close" class="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-primary">
                    {{ isEditing ? 'Update' : 'Save' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref,toRef, watch, computed } from 'vue';
import type { ApplicationProp } from '@/stores/types/types';

const props = withDefaults(defineProps<{
  modelValue: boolean;
  application: ApplicationProp | null;
}>(), {
  modelValue: false,
  application: null
});

const emit = defineEmits(['update:modelValue', 'save', 'delete']);

const isEditing = computed(() => !!props.application);

const defaultFormData: Partial<ApplicationProp> = {
  Id: 0,
  UserId: 0,
  Company: '',
  Position: '',
  DateApplied: '',
  Status: 'Applied',
  Notes: null,
  CreatedAt: '',
  UpdatedAt: ''
}
const formData = ref<Partial<ApplicationProp>>({ ...defaultFormData })

const application = toRef(props, 'application')

watch(
  application,
  (newApp) => {
    if (newApp) {
      formData.value = { ...newApp }
    } else {
      formData.value = { ...defaultFormData }
    }
  },
  { immediate: true }
)

const close = () => {
  emit('update:modelValue', false)
  setTimeout(() => {
    formData.value = { ...defaultFormData }
  }, 300)
};

const handleSubmit = () => {
  emit('save', { ...formData.value })
  close()
};

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this application?')) {
    emit('delete', props.application)
    close()
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>