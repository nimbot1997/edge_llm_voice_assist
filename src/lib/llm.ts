


import { pipeline, Pipeline } from '@xenova/transformers';
import { getModelBlob } from './downloader';

export let llm: Pipeline | null = null;

export async function initLLM() {
  try {
    console.log('Initializing LLM with Transformers.js...');

    // Use a working model that's compatible with Transformers.js
    llm = await pipeline('text-generation', 'Xenova/SmolLM-360M-Instruct', {
      device: 'cpu',
      dtype: 'q8',
      revision: 'main'
    });

    console.log('LLM initialized successfully');
  } catch (error) {
    console.error('Failed to initialize LLM:', error);
    throw error;
  }
}

export async function* stream(prompt: string) {
  if (!llm) throw new Error('LLM not initialized');

  try {
    const result = await llm(prompt, {
      max_new_tokens: 1024,
      temperature: 0.7,
      top_k: 40,
      do_sample: true,
      return_full_text: false,
    });

    // Transformers.js returns an array of results
    const response = Array.isArray(result) ? result[0]?.generated_text || '' : result?.generated_text || '';

    // Simulate streaming by yielding chunks
    const chunks = response.split(' ');
    for (const chunk of chunks) {
      yield chunk + ' ';
    }
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}



