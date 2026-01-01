<script setup lang="ts">
import { ref } from 'vue'

const userCode = ref(`<script setup>
const count = ref(0)
<\/script>

<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template>`)
const aiResponse = ref('')
const isLoading = ref(false)

async function sendToBackend() {
  isLoading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: userCode.value }),
    })
    const data = await res.json()
    aiResponse.value = data.analysis || 'No response'
  } catch (e) {
    aiResponse.value = '❌ Backend not reachable'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    style="
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    "
  >
    <h1>VerveAI 🌟</h1>
    <p>Your AI-powered development assistant</p>
    <textarea
      v-model="userCode"
      rows="10"
      style="width: 100%; font-family: monospace; font-size: 14px; padding: 8px"
    ></textarea>
    <br /><br />
    <button
      @click="sendToBackend"
      :disabled="isLoading"
      style="padding: 10px 20px; font-size: 16px"
    >
      {{ isLoading ? 'Analyzing...' : 'Get AI Review' }}
    </button>
    <div
      v-if="aiResponse"
      style="
        margin-top: 20px;
        padding: 12px;
        background: #f8f9fa;
        border-radius: 6px;
        white-space: pre-wrap;
      "
    >
      <strong>AI Feedback:</strong>
      {{ aiResponse }}
    </div>
  </div>
</template>
