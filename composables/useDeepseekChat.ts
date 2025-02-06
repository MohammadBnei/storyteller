import type { Message } from "~/types/chat"

export function useDeepseekChat() {
  const messages = ref<Message[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (text: string) => {
    loading.value = true
    error.value = null
    
    try {
      // Add user message
      messages.value.push({
        id: Date.now(),
        role: "user",
        text
      })

      // Call the API endpoint
      const { data: response } = await useFetch('/api/chat', {
        method: 'POST',
        body: {
          message: text
        }
      })

      if (!response.value) {
        throw new Error('No response from server')
      }

      messages.value.push({
        id: Date.now(),
        role: "assistant",
        text: response.value.text
      })
    } catch (e) {
      error.value = e instanceof Error ? e.message : "An unexpected error occurred"
      messages.value.push({
        id: Date.now(),
        role: "error",
        text: "Sorry, there was an error processing your request."
      })
    } finally {
      loading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
    error.value = null
  }

  return {
    messages: readonly(messages),
    loading: readonly(loading),
    error: readonly(error),
    sendMessage,
    clearMessages
  }
}
