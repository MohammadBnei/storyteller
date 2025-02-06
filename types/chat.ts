export interface Message {
  id: number
  text: string
  role: 'user' | 'assistant' | 'error'
}

export interface ChatResponse {
  text: string
  error?: string
}

export interface ChatService {
  sendMessage(message: string): Promise<ChatResponse>
}
