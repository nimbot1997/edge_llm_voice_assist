
import localforage from 'localforage';

const MODEL_URL = 'https://huggingface.co/allama-ai/SmolLM-360M-Instruct-onnx-int4/resolve/main/model.onnx';
const MODEL_KEY = 'smollm-360m-instruct-onnx-int4';
const MODEL_STORE_NAME = 'models';

interface DownloadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class ModelDownloader {
  private modelStore = localforage.createInstance({
    name: 'mini-gemma-chat',
    storeName: MODEL_STORE_NAME
  });

  async getModelBlob(): Promise<ArrayBuffer> {
    // Try to get from cache first
    const cached = await this.modelStore.getItem<ArrayBuffer>(MODEL_KEY);
    if (cached) {
      console.log('Using cached model from IndexedDB');
      return cached;
    }

    // Download if not cached
    console.log('Downloading model...');
    return this.downloadModel();
  }

  async downloadModel(onProgress?: (progress: DownloadProgress) => void): Promise<ArrayBuffer> {
    const response = await fetch(MODEL_URL);

    if (!response.ok) {
      throw new Error(`Failed to download model: ${response.statusText}`);
    }

    const total = parseInt(response.headers.get('content-length') || '0', 10);
    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error('Failed to get response reader');
    }

    const chunks: Uint8Array[] = [];
    let loaded = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      if (value) {
        chunks.push(value);
        loaded += value.length;

        if (onProgress && total > 0) {
          onProgress({
            loaded,
            total,
            percentage: Math.round((loaded / total) * 100)
          });
        }
      }
    }

    // Combine chunks into single ArrayBuffer
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;

    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }

    // Cache the downloaded model
    await this.modelStore.setItem(MODEL_KEY, combined.buffer);
    console.log('Model downloaded and cached successfully');

    return combined.buffer;
  }

  async clearCache(): Promise<void> {
    await this.modelStore.removeItem(MODEL_KEY);
    console.log('Model cache cleared');
  }

  async isCached(): Promise<boolean> {
    const cached = await this.modelStore.getItem(MODEL_KEY);
    return cached !== null;
  }

  async getCacheSize(): Promise<number> {
    const cached = await this.modelStore.getItem<ArrayBuffer>(MODEL_KEY);
    return cached ? cached.byteLength : 0;
  }
}

export const modelDownloader = new ModelDownloader();
export const getModelBlob = () => modelDownloader.getModelBlob();
export const downloadModel = (onProgress?: (progress: DownloadProgress) => void) => modelDownloader.downloadModel(onProgress);
export const clearModelCache = () => modelDownloader.clearCache();
export const isModelCached = () => modelDownloader.isCached();
export const getModelCacheSize = () => modelDownloader.getCacheSize();
