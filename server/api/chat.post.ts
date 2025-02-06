import { ChatDeepSeek } from "@langchain/deepseek"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { v4 as uuidv4 } from "uuid"
import { storytellerPrompt } from "~/lib/langchain/prompt"

const model = new ChatDeepSeek({
  temperature: 0.3,
  model: "deepseek-reasoner",
  apiKey: process.env.DEEPSEEK_API_KEY
})

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", storytellerPrompt],
  ["human", "{input}"]
])

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { message } = body

    if (!message) {
      throw createError({
        statusCode: 400,
        message: "Message is required"
      })
    }

    const prompt = await promptTemplate.invoke({
      input: message
    })

    const response = await model.invoke(prompt, {
      configurable: { thread_id: uuidv4() }
    })

    return {
      text: response.content.toString()
    }
  } catch (error) {
    console.error('Chat API error:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : "An unexpected error occurred"
    })
  }
})
