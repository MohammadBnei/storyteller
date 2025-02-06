<template>
  <div class="flex flex-col h-[600px]">
    <!-- Messages Container -->
    <div class="flex-1 overflow-y-auto" ref="messagesContainer">
      <ChatMessage
        v-for="message in props.messages"
        :key="message.id"
        :message="message"
      />
    </div>

    <!-- Input Container -->
    <div class="border-t p-4 bg-white dark:bg-gray-800">
      <ChatInput
        :loading="props.loading"
        @submit="handleUserInput"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  messages: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(message => 
        typeof message.id === 'number' &&
        typeof message.text === 'string' &&
        ['user', 'assistant'].includes(message.role)
      )
    }
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const messagesContainer = ref(null)

// Scroll to bottom when new messages arrive
watch(() => props.messages.length, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
})

const handleUserInput = (text) => {
  emit('submit', text)
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.overflow-y-auto {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
