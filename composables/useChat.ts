import { createChatService } from '~/services/chat'
import type { Message } from '~/types/chat'

export function useChat() {
  const messages = ref<Message[]>([
    {
      id: 1,
      role: 'assistant',
      text: 'Hello! How can I help you today?'
    }
  ])
  const loading = ref(false)
  const chatService = createChatService()

  const sendMessage = async (text: string) => {
    loading.value = true
    
    try {
      // Add user message
      messages.value.push({
        id: Date.now(),
        role: 'user',
        text
      })

      // Get response from chat service
      const response = await chatService.sendMessage(text)
      
      if (response.error) {
        messages.value.push({
          id: Date.now(),
          role: 'error',
          text: response.text
        })
        return
      }

      messages.value.push({
        id: Date.now(),
        role: 'assistant',
        text: response.text
      })
    } finally {
      loading.value = false
    }
  }

  return {
    messages: readonly(messages),
    loading: readonly(loading),
    sendMessage
  }
}
