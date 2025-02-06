<template>
  <form @submit.prevent="handleSubmit" class="flex gap-2">
    <UTextarea
      v-model="inputText"
      :loading="loading"
      :disabled="loading"
      placeholder="Type your message here..."
      :rows="1"
      class="flex-1"
      @keydown.enter.exact.prevent="handleSubmit"
    />
    <UButton
      type="submit"
      color="primary"
      :loading="loading"
      :disabled="!inputText.trim()"
    >
      Send
    </UButton>
  </form>
</template>

<script setup>
const inputText = ref('')
const emit = defineEmits(['submit'])

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const handleSubmit = () => {
  if (!inputText.value.trim() || props.loading) return
  
  emit('submit', inputText.value)
  inputText.value = ''
}
</script>
