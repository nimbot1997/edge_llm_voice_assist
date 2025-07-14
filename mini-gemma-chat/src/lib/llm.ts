


import { FilesetResolver, LlmInference } from '@mediapipe/tasks-genai';

export let llm: LlmInference | null = null;

export async function initLLM() {
  const genai = await FilesetResolver.forGenAiTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@latest/wasm'
  );

  llm = await LlmInference.createFromOptions(genai, {
    baseOptions: {
      modelAssetPath: '/models/gemma-2b-it-gpu-int4.task'
    },
    maxTokens: 1024,
    topK: 40,
    temperature: 0.7,
  });
}

export async function* stream(prompt: string) {
  if (!llm) throw new Error('LLM not initialized');
  const result = await llm.generateResponse(prompt);
  // For now, return the full response as a single chunk
  // In a real implementation, this would stream tokens
  yield result;
}



