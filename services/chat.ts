import type { ChatResponse, ChatService } from "~/types/chat"

export class LocalChatService implements ChatService {
  private responses = [
    "I understand what you're saying. Could you tell me more?",
    "That's interesting! Let me think about that for a moment...",
    "I see your point. Here's what I think about that...",
    "Thanks for sharing that. Would you like to explore this topic further?",
    "That's a great question! Let me help you with that."
  ]

  async sendMessage(message: string): Promise<ChatResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      const randomResponse = this.responses[Math.floor(Math.random() * this.responses.length)]
      return { text: randomResponse }
    } catch (error) {
      return {
        text: 'Sorry, there was an error processing your request.',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

// Factory function to create chat service instances
export function createChatService(): ChatService {
  return new LocalChatService()
}
