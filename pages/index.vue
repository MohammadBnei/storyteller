<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
        Welcome to AI Chat
        <span class="text-blue-600 dark:text-blue-400">Assistant</span>
      </h1>
      <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
        Ask me anything! I can help with information, ideas, and creative
        solutions. Your messages are processed locally for now.
      </p>
    </div>

    <!-- Chat Interface Card -->
    <UCard
      class="shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
    >
      <ChatContainer
        :messages="messages"
        :loading="loading"
        @submit="handleChatSubmit"
      />
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { messages, loading, sendMessage } = useDeepseekChat();

const handleChatSubmit = (text: string) => {
  sendMessage(text);
};
</script>
