import type { ExamResult } from '../types/exam.types';

const STORAGE_KEY = 'examResultsHistory';
const STORAGE_FILE = 'exam-history.json';

/**
 * Storage service that handles persistence of exam results
 * Uses localStorage as fallback if file system access is not available
 */
export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Save exam results to persistent storage
   */
  async saveResults(results: ExamResult[]): Promise<void> {
    try {
      // Try to save to file system (Electron or Tauri)
      if (this.isFileSystemAvailable()) {
        await this.saveToFile(results);
      } else {
        // Fallback to localStorage
        this.saveToLocalStorage(results);
      }
    } catch (error) {
      console.error('Failed to save exam results:', error);
      // Fallback to localStorage if file save fails
      this.saveToLocalStorage(results);
    }
  }

  /**
   * Load exam results from persistent storage
   */
  async loadResults(): Promise<ExamResult[]> {
    try {
      // Try to load from file system first
      if (this.isFileSystemAvailable()) {
        return await this.loadFromFile();
      } else {
        // Fallback to localStorage
        return this.loadFromLocalStorage();
      }
    } catch (error) {
      console.error('Failed to load exam results:', error);
      // Fallback to localStorage
      return this.loadFromLocalStorage();
    }
  }

  /**
   * Clear all stored exam results
   */
  async clearResults(): Promise<void> {
    try {
      if (this.isFileSystemAvailable()) {
        await this.deleteFile();
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Failed to clear exam results:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /**
   * Check if file system API is available
   */
  private isFileSystemAvailable(): boolean {
    // Check for Electron
    if (typeof window !== 'undefined' && (window as any).electron) {
      return true;
    }

    // Check for Tauri
    if (typeof window !== 'undefined' && (window as any).__TAURI__) {
      return true;
    }

    // Check for File System Access API (modern browsers)
    if (typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
      return false; // We'll use localStorage for now in browsers
    }

    return false;
  }

  /**
   * Save to file system (Electron/Tauri)
   */
  private async saveToFile(results: ExamResult[]): Promise<void> {
    const data = JSON.stringify(results, null, 2);

    // Electron
    if ((window as any).electron) {
      await (window as any).electron.writeFile(STORAGE_FILE, data);
      return;
    }

    // Tauri
    if ((window as any).__TAURI__) {
      const { writeTextFile, BaseDirectory } = (window as any).__TAURI__.fs;
      await writeTextFile(STORAGE_FILE, data, { dir: BaseDirectory.AppData });
      return;
    }

    throw new Error('File system not available');
  }

  /**
   * Load from file system (Electron/Tauri)
   */
  private async loadFromFile(): Promise<ExamResult[]> {
    // Electron
    if ((window as any).electron) {
      const data = await (window as any).electron.readFile(STORAGE_FILE);
      return JSON.parse(data);
    }

    // Tauri
    if ((window as any).__TAURI__) {
      const { readTextFile, BaseDirectory } = (window as any).__TAURI__.fs;
      const data = await readTextFile(STORAGE_FILE, { dir: BaseDirectory.AppData });
      return JSON.parse(data);
    }

    throw new Error('File system not available');
  }

  /**
   * Delete file from file system
   */
  private async deleteFile(): Promise<void> {
    // Electron
    if ((window as any).electron) {
      await (window as any).electron.deleteFile(STORAGE_FILE);
      return;
    }

    // Tauri
    if ((window as any).__TAURI__) {
      const { removeFile, BaseDirectory } = (window as any).__TAURI__.fs;
      await removeFile(STORAGE_FILE, { dir: BaseDirectory.AppData });
      return;
    }
  }

  /**
   * Save to localStorage (fallback)
   */
  private saveToLocalStorage(results: ExamResult[]): void {
    try {
      const data = JSON.stringify(results);
      localStorage.setItem(STORAGE_KEY, data);

      // Verify the save was successful by reading it back
      const verification = localStorage.getItem(STORAGE_KEY);
      if (verification !== data) {
        console.warn('localStorage save verification failed - data may not persist');
      }
    } catch (error) {
      console.error('localStorage save failed:', error);
      // Check if it's a quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded - consider clearing old history');
      }
    }
  }

  /**
   * Load from localStorage (fallback)
   */
  private loadFromLocalStorage(): ExamResult[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      // Validate the data structure
      if (!Array.isArray(parsed)) {
        console.error('Invalid history data format - expected array');
        return [];
      }

      // Validate each result has required fields
      const validResults = parsed.filter(result => {
        return result &&
               typeof result.score === 'number' &&
               typeof result.total === 'number' &&
               typeof result.percentage === 'number' &&
               typeof result.timestamp === 'string';
      });

      if (validResults.length !== parsed.length) {
        console.warn(`Filtered out ${parsed.length - validResults.length} invalid results`);
      }

      return validResults;
    } catch (error) {
      console.error('localStorage load failed:', error);
      return [];
    }
  }

  /**
   * Test if localStorage is available and working
   */
  isStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      const testValue = 'test';
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      return retrieved === testValue;
    } catch (error) {
      console.error('localStorage is not available:', error);
      return false;
    }
  }

  /**
   * Get storage statistics
   */
  getStorageInfo(): { itemCount: number; estimatedSize: number; available: boolean } {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        return { itemCount: 0, estimatedSize: 0, available: this.isStorageAvailable() };
      }

      const parsed = JSON.parse(saved);
      const itemCount = Array.isArray(parsed) ? parsed.length : 0;
      const estimatedSize = new Blob([saved]).size;

      return {
        itemCount,
        estimatedSize,
        available: this.isStorageAvailable()
      };
    } catch (error) {
      return { itemCount: 0, estimatedSize: 0, available: false };
    }
  }
}

export const storageService = StorageService.getInstance();
