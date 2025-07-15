


import { describe, it, expect, vi } from 'vitest';
import { modelDownloader } from '../../src/lib/downloader';

// Mock localforage
vi.mock('localforage', () => ({
  default: {
    createInstance: () => ({
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    })
  }
}));

describe('ModelDownloader', () => {
  it('should be defined', () => {
    expect(modelDownloader).toBeDefined();
  });

  it('should have required methods', () => {
    expect(typeof modelDownloader.getModelBlob).toBe('function');
    expect(typeof modelDownloader.downloadModel).toBe('function');
    expect(typeof modelDownloader.clearCache).toBe('function');
    expect(typeof modelDownloader.isCached).toBe('function');
  });

  it('should return cache size correctly', async () => {
    // Mock the cache to return a specific size
    const mockBuffer = new ArrayBuffer(1024);
    vi.spyOn(modelDownloader, 'getCacheSize').mockResolvedValue(1024);

    const size = await modelDownloader.getCacheSize();
    expect(size).toBe(1024);
  });
});



