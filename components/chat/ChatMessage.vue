<template>
  <div 
    :class="[
      'flex gap-3 p-4',
      message.role === 'assistant' ? 'bg-gray-50' : ''
    ]"
  >
    <UAvatar
      :src="message.role === 'assistant' ? '/img/assistant.png' : '/img/user.png'"
      :alt="message.role"
    />
    <div class="flex-1">
      <p class="text-sm font-semibold mb-1">
        {{ message.role === 'assistant' ? 'Assistant' : 'You' }}
      </p>
      <p class="text-gray-700">{{ message.text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['user', 'assistant'].includes(value.role) && 
             typeof value.text === 'string' &&
             typeof value.id === 'number'
    }
  }
})
</script>
