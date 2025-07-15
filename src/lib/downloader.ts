

import localforage from 'localforage';

// With Transformers.js, we don't need to manually download models
// The library handles caching automatically

interface DownloadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class ModelDownloader {
  private modelStore = localforage.createInstance({
    name: 'mini-gemma-chat',
    storeName: 'models'
  });

  // No-op methods for backward compatibility
  async getModelBlob(): Promise<ArrayBuffer> {
    return new ArrayBuffer(0);
  }

  async downloadModel(onProgress?: (progress: DownloadProgress) => void): Promise<ArrayBuffer> {
    return new ArrayBuffer(0);
  }

  async clearCache(): Promise<void> {
    console.log('Model cache cleared');
  }

  async isCached(): Promise<boolean> {
    return true;
  }

  async getCacheSize(): Promise<number> {
    return 0;
  }
}

export const modelDownloader = new ModelDownloader();
export const getModelBlob = () => modelDownloader.getModelBlob();
export const downloadModel = (onProgress?: (progress: DownloadProgress) => void) => modelDownloader.downloadModel(onProgress);
export const clearModelCache = () => modelDownloader.clearCache();
export const isModelCached = () => modelDownloader.isCached();
export const getModelCacheSize = () => modelDownloader.getCacheSize();


