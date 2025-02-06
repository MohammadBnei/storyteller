import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";
import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { storytellerPrompt } from "./prompt";

const model = new ChatDeepSeek({
  temperature: 0.3,
  model: "deepseek-reasoner",
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    storytellerPrompt,
  ],
  ["placeholder", "{messages}"],
]);

const config = { configurable: { thread_id: uuidv4() } };

// Define the function that calls the model
export const callModel = async (state: typeof MessagesAnnotation.State) => {
  const prompt = await promptTemplate.invoke(state);

  const response = await model.invoke(prompt, config);
  return { messages: response };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
  // Define the node and edge
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

// Add memory
const memory = new MemorySaver();

export const storyteller = workflow.compile({ checkpointer: memory });
