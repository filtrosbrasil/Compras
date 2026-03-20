import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'compras-fb-conv2026';

/**
 * Simple storage using localStorage.
 * All users on the same browser share data.
 * For multi-device sync, replace with a real API (Supabase, Firebase, etc).
 * 
 * The hook also listens to the 'storage' event so if someone
 * opens the app in another tab, changes propagate automatically.
 */
export function useStorage(initialData) {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setData(JSON.parse(saved));
      } else {
        setData(initialData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      }
    } catch {
      setData(initialData);
    }
    setLoaded(true);
  }, []);

  // Listen for changes from other tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { setData(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const save = useCallback((newData) => {
    setData(newData);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newData)); } catch {}
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData)); } catch {}
  }, [initialData]);

  return { data, save, loaded, reset };
}
