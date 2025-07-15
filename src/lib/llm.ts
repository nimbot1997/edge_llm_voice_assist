


import { FilesetResolver, LlmInference } from '@mediapipe/tasks-genai';
import { getModelBlob } from './downloader';

export let llm: LlmInference | null = null;

export async function initLLM() {
  const genai = await FilesetResolver.forGenAiTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@latest/wasm'
  );

  // Get model from IndexedDB cache or download it
  const modelBlob = await getModelBlob();
  const modelUrl = URL.createObjectURL(new Blob([modelBlob]));

  llm = await LlmInference.createFromOptions(genai, {
    baseOptions: {
      modelAssetPath: modelUrl
    },
    maxTokens: 1024,
    topK: 40,
    temperature: 0.7,
  });

  // Clean up the blob URL after initialization
  URL.revokeObjectURL(modelUrl);
}

export async function* stream(prompt: string) {
  if (!llm) throw new Error('LLM not initialized');
  const result = await llm.generateResponse(prompt);
  // For now, return the full response as a single chunk
  // In a real implementation, this would stream tokens
  yield result;
}



